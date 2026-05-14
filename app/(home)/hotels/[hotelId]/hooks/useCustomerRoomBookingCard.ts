'use client'

import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { useAuth } from '@/core/context/AuthContext'
import { getErrorMessage } from '@/core/utils/apiError'
import { openCustomerInvoicePdf } from '../invoice/components/openCustomerInvoicePdf'
import { openReservationContractPdf } from '../components/customerReservationContract/openReservationContractPdf'
import type { CustomerInvoice } from '../invoice/types/customerInvoice'
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails,
} from '../types/customerReservationConfirmation'
import type { ReservationContractData } from '../types/customerReservationContract'
import { useCustomerReservationManager } from './useCustomerReservationManager'
import { useReservationFeedback } from './useReservationFeedback'
import { buildReservationContract } from '../utils/buildReservationContract'
import { findAvailabilityConflict } from '../utils/customerReservationPolicy'
import { getStayLength, getTotalReservationPrice } from '../utils/roomBooking'

interface ReservationCreatedDocuments {
  contract: ReservationContractData
  invoice: CustomerInvoice | null
}

interface UseCustomerRoomBookingCardOptions {
  hotelId: string
  roomId: string
  hotel: CustomerHotel | null
  room: Pick<
    RoomProfile,
    'type' | 'status' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'starRating' | 'yearlyInsurance' | 'insurancePerReservation'
  >
  reservation: ReservationDetails
}

export function useCustomerRoomBookingCard({
  hotelId,
  roomId,
  hotel,
  room,
  reservation,
}: UseCustomerRoomBookingCardOptions) {
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const { currentReservation, roomReservations, createReservation, isBusy } =
    useCustomerReservationManager(hotelId, roomId)
  const { feedback, showFeedback, closeFeedback } = useReservationFeedback()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [guestPromptOpen, setGuestPromptOpen] = useState(false)
  const [createdDocuments, setCreatedDocuments] = useState<ReservationCreatedDocuments | null>(null)
  const [openingContract, setOpeningContract] = useState(false)
  const [openingInvoice, setOpeningInvoice] = useState(false)

  const roomType = ROOM_TYPES[room.type]
  const stayLength = useMemo(
    () => getStayLength(reservation.checkIn, reservation.checkOut),
    [reservation.checkIn, reservation.checkOut]
  )
  const totalPrice = useMemo(
    () => getTotalReservationPrice(room.pricePerNight, stayLength, reservation.rooms),
    [reservation.rooms, room.pricePerNight, stayLength]
  )
  const isBookable =
    room.status !== ROOM_STATUS.MAINTENANCE && room.status !== ROOM_STATUS.BLOCKED
  const isReservationReady =
    reservation.checkIn.length > 0 &&
    reservation.checkOut.length > 0 &&
    reservation.guests > 0 &&
    reservation.rooms > 0 &&
    stayLength > 0 &&
    room.pricePerNight != null

  const draftAvailabilityConflict = useMemo(() => {
    if (!isReservationReady || currentReservation != null) {
      return null
    }

    return findAvailabilityConflict(roomReservations, {
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
    })
  }, [
    currentReservation,
    isReservationReady,
    reservation.checkIn,
    reservation.checkOut,
    roomReservations,
  ])

  const handleConfirmReservation = async ({
    termsAccepted,
    customerSignatureDataUrl,
    acceptedTermsTitle,
    acceptedTermsContent,
    taxPostalCode,
    includeInsurance,
  }: CustomerReservationConfirmationPayload) => {
    if (
      !isBookable ||
      !isReservationReady ||
      draftAvailabilityConflict != null ||
      room.pricePerNight == null
    ) {
      return
    }

    const contractWindow = window.open('about:blank', '_blank')
    if (contractWindow) {
      contractWindow.opener = null
    }

    try {
      const confirmedReservation = await createReservation({
        hotelId,
        roomId,
        hotelName: reservation.hotelName,
        hotelLogo: hotel?.logo ?? hotel?.branding.logo,
        hotelPrimaryColor: hotel?.branding.colors.primary,
        hotelSecondaryColor: hotel?.branding.colors.secondary,
        hotelCountry: hotel?.country,
        hotelCity: hotel?.city,
        hotelAddress: hotel?.address,
        hotelZip: hotel?.hotelZip ?? taxPostalCode,
        roomNumber: reservation.roomNumber,
        roomType: roomType.label,
        customerName:
          user?.name ??
          [user?.firstName, user?.lastName].filter(Boolean).join(' ') ??
          'Guest customer',
        customerEmail: user?.email ?? 'guest@example.com',
        paymentMethod: 'Online payment',
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guests: reservation.guests,
        rooms: reservation.rooms,
        currency: reservation.currency,
        cancellationFeeRate: hotel?.cancellationFeeRate,
        nightlyRate: room.pricePerNight,
        extendPrice: room.extendPrice ?? room.pricePerNight,
        includeInsurance,
        termsAccepted,
        customerSignatureDataUrl,
      })

      const contract = buildReservationContract({
        reservation: confirmedReservation,
        hotel,
        user,
        roomCapacity: room.capacity,
        roomTypeLabel: roomType.label,
        language: i18n.language,
        termsTitle: acceptedTermsTitle,
        termsContent: acceptedTermsContent,
      })

      setCreatedDocuments({
        contract,
        invoice: confirmedReservation.invoice ?? null,
      })
      await openReservationContractPdf(contract, contractWindow)
      setConfirmOpen(false)
      showFeedback('success', 'Reservation created successfully.')
    } catch (error) {
      contractWindow?.close()
      showFeedback('error', getErrorMessage(error, 'Failed to create reservation.'))
    }
  }

  const handleOpenContract = async () => {
    if (!createdDocuments) {
      return
    }

    const targetWindow = window.open('about:blank', '_blank')
    if (targetWindow) {
      targetWindow.opener = null
    }

    try {
      setOpeningContract(true)
      await openReservationContractPdf(createdDocuments.contract, targetWindow)
    } catch (error) {
      targetWindow?.close()
      showFeedback('error', getErrorMessage(error, 'Failed to open reservation contract.'))
    } finally {
      setOpeningContract(false)
    }
  }

  const handleOpenInvoice = async () => {
    if (!createdDocuments?.invoice) {
      showFeedback('error', 'No invoice is available for this reservation.')
      return
    }

    const targetWindow = window.open('about:blank', '_blank')
    if (targetWindow) {
      targetWindow.opener = null
    }

    try {
      setOpeningInvoice(true)
      await openCustomerInvoicePdf(createdDocuments.invoice, targetWindow)
    } catch (error) {
      targetWindow?.close()
      showFeedback('error', getErrorMessage(error, 'Failed to open invoice.'))
    } finally {
      setOpeningInvoice(false)
    }
  }

  return {
    language: i18n.language,
    roomType,
    currentReservation,
    isBusy,
    isBookable,
    isReservationReady,
    draftAvailabilityConflict,
    feedback,
    confirmOpen,
    createdDocuments,
    openingContract,
    openingInvoice,
    reservationSummary: {
      checkIn: currentReservation?.checkIn ?? reservation.checkIn,
      checkOut: currentReservation?.checkOut ?? reservation.checkOut,
      guests: currentReservation?.guests ?? reservation.guests,
      stayLength,
      estimatedTotal: currentReservation?.totalPrice ?? totalPrice,
    },
    checkInMinDate: dayjs().format('YYYY-MM-DD'),
    checkOutMinDate: reservation.checkIn
      ? dayjs(reservation.checkIn).add(1, 'day').format('YYYY-MM-DD')
      : undefined,
    canOpenConfirmationModal: currentReservation == null && isBookable && isReservationReady,
    isReserveDisabled:
      !isBookable || !isReservationReady || draftAvailabilityConflict != null || isBusy,
    guestPromptOpen,
    closeGuestPrompt: () => setGuestPromptOpen(false),
    openConfirm: () => {
      if (!user) {
        setGuestPromptOpen(true)
        return
      }
      setConfirmOpen(true)
    },
    closeConfirm: () => setConfirmOpen(false),
    closeCreatedDocuments: () => setCreatedDocuments(null),
    closeFeedback,
    handleConfirmReservation,
    handleOpenContract,
    handleOpenInvoice,
  }
}
