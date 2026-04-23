'use client'

import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import { getErrorMessage } from '@/core/utils/apiError'
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails,
} from '../types/customerReservationConfirmation'
import { useCustomerReservationManager } from './useCustomerReservationManager'
import { useReservationFeedback } from './useReservationFeedback'
import { findAvailabilityConflict } from '../utils/customerReservationPolicy'
import { getRoomDetails, getStayLength, getTotalReservationPrice } from '../utils/roomBooking'

interface UseCustomerRoomBookingCardOptions {
  hotelId: string
  roomId: string
  room: Pick<
    RoomProfile,
    'type' | 'status' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'starRating'
  >
  reservation: ReservationDetails
}

export function useCustomerRoomBookingCard({
  hotelId,
  roomId,
  room,
  reservation,
}: UseCustomerRoomBookingCardOptions) {
  const { t, i18n } = useTranslation()
  const { currentReservation, roomReservations, createReservation, isBusy } =
    useCustomerReservationManager(hotelId, roomId)
  const { feedback, showFeedback, closeFeedback } = useReservationFeedback()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const roomType = ROOM_TYPES[room.type]
  const details = useMemo(
    () => getRoomDetails(room, t, i18n.language, reservation.currency),
    [i18n.language, reservation.currency, room, t]
  )
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
      await createReservation({
        hotelId,
        roomId,
        hotelName: reservation.hotelName,
        roomNumber: reservation.roomNumber,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guests: reservation.guests,
        rooms: reservation.rooms,
        currency: reservation.currency,
        nightlyRate: room.pricePerNight,
        termsAccepted,
        customerSignatureDataUrl,
      })

      setConfirmOpen(false)
      showFeedback('success', 'Reservation created successfully.')
    } catch (error) {
      showFeedback('error', getErrorMessage(error, 'Failed to create reservation.'))
    }
  }

  return {
    language: i18n.language,
    roomType,
    details,
    currentReservation,
    isBusy,
    isBookable,
    isReservationReady,
    draftAvailabilityConflict,
    feedback,
    confirmOpen,
    reservationSummary: {
      checkIn: currentReservation?.checkIn ?? reservation.checkIn,
      checkOut: currentReservation?.checkOut ?? reservation.checkOut,
      guests: currentReservation?.guests ?? reservation.guests,
      estimatedTotal: currentReservation?.totalPrice ?? totalPrice,
    },
    checkInMinDate: dayjs().format('YYYY-MM-DD'),
    checkOutMinDate: reservation.checkIn
      ? dayjs(reservation.checkIn).add(1, 'day').format('YYYY-MM-DD')
      : undefined,
    canOpenConfirmationModal: currentReservation == null && isBookable && isReservationReady,
    isReserveDisabled:
      !isBookable || !isReservationReady || draftAvailabilityConflict != null || isBusy,
    openConfirm: () => setConfirmOpen(true),
    closeConfirm: () => setConfirmOpen(false),
    closeFeedback,
    handleConfirmReservation,
  }
}
