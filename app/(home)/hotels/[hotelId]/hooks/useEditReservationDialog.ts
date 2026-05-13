'use client'

import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ReservationSource } from '@/app/(home)/reservations/[hotelId]/config/reservationConfig'

export type EditReservationFieldKey =
  | 'roomId'
  | 'checkIn'
  | 'checkOut'
  | 'guests'
  | 'rooms'
  | 'source'
  | 'guestFullName'
  | 'guestPhone'
  | 'guestIdNumber'
  | 'hasInsurance'
  | 'specialRequests'
  | 'notes'

export interface EditReservationFormState {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  source?: ReservationSource | ''
  guestFullName?: string
  guestPhone?: string
  guestIdNumber?: string
  hasInsurance?: boolean
  specialRequests?: string
  notes?: string
}

interface UseEditReservationDialogOptions {
  open: boolean
  canModify: boolean
  roomCapacity: number
  isBusy: boolean
  nightlyRate: number
  editForm: EditReservationFormState
  editFormHasValidRange: boolean
  editStayLength: number
  editConflict: {
    checkIn: string
    checkOut: string
  } | null
  isLoadingDetails: boolean
  showDirectReservationFields: boolean
  onFieldChange: (key: EditReservationFieldKey, value: string | number | boolean) => void
}

export function useEditReservationDialog({
  open,
  canModify,
  roomCapacity,
  isBusy,
  nightlyRate,
  editForm,
  editFormHasValidRange,
  editStayLength,
  editConflict,
  isLoadingDetails,
  showDirectReservationFields,
  onFieldChange,
}: UseEditReservationDialogOptions) {
  const steps = useMemo(
    () =>
      showDirectReservationFields
        ? ['Guest', 'Stay', 'Reservation']
        : ['Stay'],
    [showDirectReservationFields]
  )
  const [activeStep, setActiveStep] = useState(0)
  const stayStepIndex = showDirectReservationFields ? 1 : 0
  const isLastStep = activeStep === steps.length - 1
  const isStayStepValid =
    editForm.roomId.length > 0 &&
    editFormHasValidRange &&
    editForm.guests >= 1 &&
    editForm.guests <= roomCapacity &&
    editForm.rooms >= 1 &&
    editConflict == null
  const isCurrentStepValid = activeStep === stayStepIndex ? isStayStepValid : true
  const isSaveDisabled =
    !canModify ||
    !isStayStepValid ||
    isLoadingDetails ||
    isBusy
  const minCheckInDate = dayjs().format('YYYY-MM-DD')
  const minCheckOutDate = editForm.checkIn
    ? dayjs(editForm.checkIn).add(1, 'day').format('YYYY-MM-DD')
    : undefined
  const updatedStayTotal = nightlyRate * editStayLength * editForm.rooms

  useEffect(() => {
    if (open) {
      setActiveStep(0)
    }
  }, [open])

  const handleBack = () => {
    setActiveStep(current => Math.max(current - 1, 0))
  }

  const handleNext = () => {
    setActiveStep(current => Math.min(current + 1, steps.length - 1))
  }

  const handleCheckInChange = (value: string) => {
    onFieldChange('checkIn', value)

    if (editForm.checkOut && value && editForm.checkOut <= value) {
      onFieldChange('checkOut', '')
    }
  }

  return {
    steps,
    activeStep,
    stayStepIndex,
    isLastStep,
    isCurrentStepValid,
    isSaveDisabled,
    minCheckInDate,
    minCheckOutDate,
    updatedStayTotal,
    handleBack,
    handleNext,
    handleCheckInChange,
  }
}
