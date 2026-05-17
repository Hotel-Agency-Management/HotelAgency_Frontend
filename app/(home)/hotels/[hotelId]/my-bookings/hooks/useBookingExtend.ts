'use client'

import { useState } from 'react'
import type { ReservationDetail } from '../config'
import { useUpdateMyReservation } from './mutations/customerReservationMutations'

interface UseBookingExtendParams {
  booking: ReservationDetail | null
}

export function useBookingExtend({ booking }: UseBookingExtendParams) {
  const [extendOpen, setExtendOpen] = useState(false)
  const [extendCheckOut, setExtendCheckOut] = useState('')
  const updateMutation = useUpdateMyReservation()

  const extendHasValidRange = Boolean(booking && extendCheckOut > booking.checkOutDate)

  const openExtend = () => {
    if (!booking) return

    setExtendCheckOut(booking.checkOutDate)
    setExtendOpen(true)
  }

  const closeExtend = () => setExtendOpen(false)

  const saveExtend = () => {
    if (!booking || !extendCheckOut || extendCheckOut <= booking.checkOutDate) return

    updateMutation.mutate(
      { id: booking.id, data: { checkOutDate: extendCheckOut } },
      { onSuccess: closeExtend }
    )
  }

  return {
    extendOpen,
    extendCheckOut,
    extendHasValidRange,
    openExtend,
    closeExtend,
    onCheckOutChange: setExtendCheckOut,
    saveExtend,
    isUpdating: updateMutation.isPending,
  }
}
