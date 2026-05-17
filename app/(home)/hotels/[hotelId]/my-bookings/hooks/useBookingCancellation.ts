'use client'

import { useState } from 'react'
import type { CustomerReservation } from '../../types/customerReservation'
import {
  calculateCancellationFee,
  formatPolicyPercentage,
  getFreeCancellationDeadline,
  isFreeCancellationEligible,
  normalizeCancellationFeeRate,
} from '../../utils/customerReservationPolicy'
import type { ReservationDetail } from '../config'
import { useCancelMyReservation } from './mutations/customerReservationMutations'

interface UseBookingCancellationParams {
  booking: ReservationDetail | null
  hotelId: string
  roomNumber: string
  nightlyRate: number
  extendPrice: number
  totalAmount: number
}

function buildCancellationReservation(
  booking: ReservationDetail,
  hotelId: string,
  roomNumber: string,
  nightlyRate: number,
  extendPrice: number,
  totalAmount: number
): CustomerReservation {
  return {
    id: String(booking.id),
    hotelId,
    roomId: roomNumber,
    hotelName: booking.hotelName,
    roomNumber,
    checkIn: booking.checkInDate,
    checkOut: booking.checkOutDate,
    guests: booking.numberOfGuests,
    rooms: booking.numberOfRooms,
    currency: 'USD',
    nightlyRate,
    extendPrice,
    includeInsurance: booking.hasInsurance,
    totalPrice: totalAmount,
    status: booking.status.toLowerCase() === 'confirmed' ? 'confirmed' : 'cancelled',
    source: 'customer',
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  }
}

export function useBookingCancellation({
  booking,
  hotelId,
  roomNumber,
  nightlyRate,
  extendPrice,
  totalAmount,
}: UseBookingCancellationParams) {
  const [cancelOpen, setCancelOpen] = useState(false)
  const cancelMutation = useCancelMyReservation()

  const cancellationReservation = booking
    ? buildCancellationReservation(booking, hotelId, roomNumber, nightlyRate, extendPrice, totalAmount)
    : null

  const freeCancellation = cancellationReservation
    ? isFreeCancellationEligible(cancellationReservation)
    : false
  const cancellationFee = cancellationReservation
    ? calculateCancellationFee(cancellationReservation)
    : 0
  const cancellationFeeRateLabel = formatPolicyPercentage(normalizeCancellationFeeRate())
  const refundAmount = Math.max(totalAmount - cancellationFee, 0)
  const freeCancellationDeadlineLabel = booking
    ? new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(getFreeCancellationDeadline(booking.checkInDate))
      )
    : ''

  const openCancel = () => setCancelOpen(true)
  const closeCancel = () => setCancelOpen(false)

  const confirmCancel = () => {
    if (!booking) return

    cancelMutation.mutate(booking.id, { onSuccess: closeCancel })
  }

  return {
    cancelOpen,
    openCancel,
    closeCancel,
    freeCancellation,
    cancellationFee,
    cancellationFeeRateLabel,
    refundAmount,
    freeCancellationDeadlineLabel,
    confirmCancel,
    isCancelling: cancelMutation.isPending,
  }
}
