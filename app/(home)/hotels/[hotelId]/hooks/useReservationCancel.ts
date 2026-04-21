'use client'

import { useState } from 'react'
import { getErrorMessage } from '@/core/utils/apiError'
import type { CustomerReservation } from '../types/customerReservation'

interface UseReservationCancelOptions {
  currentReservation: CustomerReservation | null
  cancelReservation: (reservationId: string) => Promise<CustomerReservation>
  showFeedback: (severity: 'success' | 'error', message: string) => void
  formatCurrencyValue: (value: number, currency: string) => string
}

export function useReservationCancel({
  currentReservation,
  cancelReservation,
  showFeedback,
  formatCurrencyValue,
}: UseReservationCancelOptions) {
  const [cancelOpen, setCancelOpen] = useState(false)

  const openCancel = () => {
    setCancelOpen(true)
  }

  const closeCancel = () => {
    setCancelOpen(false)
  }

  const confirmCancel = async () => {
    if (currentReservation == null) {
      return
    }

    try {
      const cancelledReservation = await cancelReservation(currentReservation.id)
      closeCancel()
      const cancellationFee = cancelledReservation.cancellationFee ?? 0

      const feeMessage =
        cancellationFee > 0
          ? `Reservation cancelled. Cancellation fee applied: ${formatCurrencyValue(
              cancellationFee,
              cancelledReservation.currency
            )}.`
          : 'Reservation cancelled without any fee.'

      showFeedback('success', feeMessage)
    } catch (error) {
      showFeedback('error', getErrorMessage(error, 'Failed to cancel reservation.'))
    }
  }

  return {
    cancelOpen,
    openCancel,
    closeCancel,
    confirmCancel,
  }
}
