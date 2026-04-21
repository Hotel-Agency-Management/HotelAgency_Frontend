'use client'

import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { getErrorMessage } from '@/core/utils/apiError'
import type {
  CustomerReservation,
  ExtendCustomerReservationInput,
} from '../types/customerReservation'
import { findAvailabilityConflict } from '../utils/customerReservationPolicy'

interface UseReservationExtendOptions {
  currentReservation: CustomerReservation | null
  roomReservations: CustomerReservation[]
  extendReservation: (input: ExtendCustomerReservationInput) => Promise<unknown>
  showFeedback: (severity: 'success' | 'error', message: string) => void
}

export function useReservationExtend({
  currentReservation,
  roomReservations,
  extendReservation,
  showFeedback,
}: UseReservationExtendOptions) {
  const [extendOpen, setExtendOpen] = useState(false)
  const [extendCheckOut, setExtendCheckOut] = useState('')

  const extendHasValidRange =
    currentReservation != null &&
    extendCheckOut.length > 0 &&
    dayjs(extendCheckOut).isAfter(dayjs(currentReservation.checkOut), 'day')

  const extendConflict = useMemo(() => {
    if (!extendHasValidRange || currentReservation == null) {
      return null
    }

    return findAvailabilityConflict(roomReservations, {
      checkIn: currentReservation.checkIn,
      checkOut: extendCheckOut,
      excludeReservationId: currentReservation.id,
    })
  }, [
    currentReservation,
    extendCheckOut,
    extendHasValidRange,
    roomReservations,
  ])

  const openExtend = () => {
    if (currentReservation == null) {
      return
    }

    setExtendCheckOut(dayjs(currentReservation.checkOut).add(1, 'day').format('YYYY-MM-DD'))
    setExtendOpen(true)
  }

  const closeExtend = () => {
    setExtendOpen(false)
  }

  const confirmExtend = async () => {
    if (currentReservation == null || !extendHasValidRange || extendConflict != null) {
      return
    }

    try {
      await extendReservation({
        reservationId: currentReservation.id,
        checkOut: extendCheckOut,
      })

      closeExtend()
      showFeedback('success', 'Reservation extended successfully.')
    } catch (error) {
      showFeedback('error', getErrorMessage(error, 'Failed to extend reservation.'))
    }
  }

  return {
    extendOpen,
    extendCheckOut,
    extendHasValidRange,
    extendConflict,
    openExtend,
    closeExtend,
    setExtendCheckOut,
    confirmExtend,
  }
}
