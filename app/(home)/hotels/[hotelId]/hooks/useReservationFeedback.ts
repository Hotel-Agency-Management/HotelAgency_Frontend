'use client'

import { useState } from 'react'

export type ReservationFeedbackSeverity = 'success' | 'error'

export interface ReservationFeedbackState {
  open: boolean
  message: string
  severity: ReservationFeedbackSeverity
}

export function useReservationFeedback() {
  const [feedback, setFeedback] = useState<ReservationFeedbackState>({
    open: false,
    message: '',
    severity: 'success',
  })

  const showFeedback = (severity: ReservationFeedbackSeverity, message: string) => {
    setFeedback({ open: true, message, severity })
  }

  const closeFeedback = () => {
    setFeedback(current => ({ ...current, open: false }))
  }

  return {
    feedback,
    showFeedback,
    closeFeedback,
  }
}

