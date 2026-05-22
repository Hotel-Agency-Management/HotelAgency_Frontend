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
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails,
} from '../types/customerReservationConfirmation'
import { useCustomerReservationManager } from './useCustomerReservationManager'
import { useReservationFeedback } from './useReservationFeedback'
import { findAvailabilityConflict } from '../utils/customerReservationPolicy'
import { saveCustomerReservationDocumentUrls } from '../utils/customerReservationDocumentUrls'
import { getStayLength, getTotalReservationPrice } from '../utils/roomBooking'

interface ReservationCreatedDocuments {
  contractUrl: string | null
  invoiceUrl: string | null
}

const createPdfFileUrl = (file: File | undefined) => {
  if (!file) return null

  return URL.createObjectURL(file)
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
  onReservationCreated?: (documents: ReservationCreatedDocuments) => void
}

export function useCustomerRoomBookingCard({
  hotelId,
  roomId,
  hotel,
  room,
  reservation,
  onReservationCreated,
}: UseCustomerRoomBookingCardOptions) {
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const { currentReservation, roomReservations, createReservation, isBusy } =
    useCustomerReservationManager(hotelId, roomId, reservation.roomNumber, hotel?.agencyId)
  const { feedback, showFeedback, closeFeedback } = useReservationFeedback()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [guestPromptOpen, setGuestPromptOpen] = useState(false)
  const [createdDocuments, setCreatedDocuments] = useState<ReservationCreatedDocuments | null>(null)

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
    if (!isReservationReady) {
      return null
    }

    return findAvailabilityConflict(
      currentReservation != null
        ? [currentReservation, ...roomReservations]
        : roomReservations,
      {
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      }
    )
  }, [
    currentReservation,
    isReservationReady,
    reservation.checkIn,
    reservation.checkOut,
    roomReservations,
  ])

  const handleConfirmReservation = async ({
    contractFile,
    includeInsurance,
    invoiceFile,
  }: CustomerReservationConfirmationPayload) => {
    if (
      !isBookable ||
      !isReservationReady ||
      draftAvailabilityConflict != null ||
      room.pricePerNight == null
    ) {
      return
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
        hotelZip: hotel?.hotelZip,
        roomNumber: reservation.roomNumber,
        roomType: ROOM_TYPES[room.type].label,
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
        termsAccepted: true,
        customerSignatureDataUrl: '',
        contractFile,
        invoiceFile,
      })

      const documentUrls = {
        contractUrl: createPdfFileUrl(contractFile),
        invoiceUrl: createPdfFileUrl(invoiceFile),
      }

      saveCustomerReservationDocumentUrls(confirmedReservation.id, documentUrls)
      setCreatedDocuments(documentUrls)
      onReservationCreated?.(documentUrls)

      setConfirmOpen(false)
      showFeedback('success', 'Reservation created successfully.')
    } catch (error) {
      showFeedback('error', getErrorMessage(error, 'Failed to create reservation.'))
    }
  }

  const handleOpenContract = () => {
    if (!createdDocuments?.contractUrl) return
    window.open(createdDocuments.contractUrl, '_blank', 'noopener,noreferrer')
  }

  const handleOpenInvoice = () => {
    if (!createdDocuments?.invoiceUrl) return
    window.open(createdDocuments.invoiceUrl, '_blank', 'noopener,noreferrer')
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
    reservationSummary: {
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      stayLength,
      estimatedTotal: totalPrice,
    },
    checkInMinDate: dayjs().format('YYYY-MM-DD'),
    checkOutMinDate: reservation.checkIn
      ? dayjs(reservation.checkIn).add(1, 'day').format('YYYY-MM-DD')
      : undefined,
    canOpenConfirmationModal: isBookable && isReservationReady && draftAvailabilityConflict == null,
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
