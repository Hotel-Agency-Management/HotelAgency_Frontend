'use client'

import { useMemo } from 'react'
import type { PublicRoom } from '@/app/(home)/hotels/types/customerRoom'
import { getPublicRoomExtendPrice, getPublicRoomNightlyRate } from '../../utils/publicRoomFields'
import { getStayLength } from '../../utils/roomBooking'
import type { ReservationDetail } from '../config'

interface UseBookingPricingParams {
  booking: ReservationDetail | null
  rooms: PublicRoom[]
}

export function useBookingPricing({ booking, rooms }: UseBookingPricingParams) {
  const roomNumber = booking?.roomNumbers[0] != null ? String(booking.roomNumbers[0]) : ''

  const bookingRoom = useMemo(
    () => rooms.find(room => String(room.roomNumber) === roomNumber) ?? null,
    [roomNumber, rooms]
  )

  const stayLength = booking ? getStayLength(booking.checkInDate, booking.checkOutDate) : 0
  const totalAmount = booking?.totalAmount ?? 0
  const numberOfRooms = booking?.numberOfRooms ?? 1
  const estimatedNightlyRate =
    stayLength > 0 && numberOfRooms > 0 ? totalAmount / stayLength / numberOfRooms : 0
  const nightlyRate = bookingRoom
    ? (getPublicRoomNightlyRate(bookingRoom) ?? estimatedNightlyRate)
    : estimatedNightlyRate
  const extendPrice = bookingRoom
    ? (getPublicRoomExtendPrice(bookingRoom) ?? nightlyRate)
    : nightlyRate

  return { roomNumber, bookingRoom, stayLength, totalAmount, numberOfRooms, estimatedNightlyRate, nightlyRate, extendPrice }
}
