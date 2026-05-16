'use client'

import { useCallback, useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import type {
  CancellationResponse,
  CancelReservationRequest,
  ReservationListItem,
} from '../config/reservationConfig'

type CancelReservationMutation = UseMutationResult<
  CancellationResponse,
  unknown,
  { reservationId: number; data: CancelReservationRequest }
>

export function useReservationCancelDialog(cancelMutation: CancelReservationMutation) {
  const [cancellingReservation, setCancellingReservation] = useState<ReservationListItem | null>(
    null
  )

  const handleOpenCancel = useCallback((row: ReservationListItem) => {
    setCancellingReservation(row)
  }, [])

  const handleCloseCancel = useCallback(() => {
    setCancellingReservation(null)
  }, [])

  const handleConfirmCancel = useCallback(() => {
    if (!cancellingReservation) return

    cancelMutation.mutate(
      {
        reservationId: cancellingReservation.id,
        data: { cancellationReason: 'Staff cancellation' },
      },
      { onSuccess: handleCloseCancel }
    )
  }, [cancellingReservation, cancelMutation, handleCloseCancel])

  return {
    cancellingReservation,
    handleOpenCancel,
    handleCloseCancel,
    handleConfirmCancel,
  }
}
