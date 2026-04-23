'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { HOTEL_TERMS_STATUSES } from '@/app/(home)/agency/hotels/terms-and-conditions/constants/status'
import { useHotelTerms } from '@/app/(home)/agency/hotels/terms-and-conditions/hooks/useHotelTermsQueries'
import { createConfirmationStepStrategy } from '../components/customerReservationConfirmation/factory'
import {
  BOOKING_CONFIRMATION_STEP_IDS,
  BOOKING_CONFIRMATION_STEPS,
  FALLBACK_TERMS_CONTENT,
  buildBookingDetailItems,
  type BookingConfirmationStepId,
} from '../constants/customerReservationConfirmation'
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails,
} from '../types/customerReservationConfirmation'
import {
  formatBookingDate,
  formatCurrency,
  getStayLength,
  getTotalReservationPrice,
} from '../utils/roomBooking'

interface UseCustomerReservationConfirmationModalOptions {
  open: boolean
  hotelId: string
  room: Pick<RoomProfile, 'type' | 'capacity' | 'pricePerNight'>
  reservation: ReservationDetails
  onConfirm: (payload: CustomerReservationConfirmationPayload) => void
}

const getStepIndexById = (stepId: BookingConfirmationStepId) =>
  Math.max(
    BOOKING_CONFIRMATION_STEPS.findIndex(step => step.id === stepId),
    0
  )

export function useCustomerReservationConfirmationModal({
  open,
  hotelId,
  room,
  reservation,
  onConfirm,
}: UseCustomerReservationConfirmationModalOptions) {
  const { i18n } = useTranslation()
  const { data: hotelTerms, isLoading: termsLoading } = useHotelTerms(hotelId)
  const [activeStep, setActiveStep] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [signatureDataUrl, setSignatureDataUrl] = useState('')
  const [stepError, setStepError] = useState('')

  const roomType = ROOM_TYPES[room.type]
  const currentStep = BOOKING_CONFIRMATION_STEPS[activeStep] ?? BOOKING_CONFIRMATION_STEPS[0]
  const stayLength = getStayLength(reservation.checkIn, reservation.checkOut)
  const totalPrice = getTotalReservationPrice(room.pricePerNight, stayLength, reservation.rooms)
  const activeTerms = hotelTerms?.status === HOTEL_TERMS_STATUSES.ACTIVE ? hotelTerms : null

  const termsContent = activeTerms?.content ?? FALLBACK_TERMS_CONTENT
  const termsTitle = activeTerms?.title ?? 'Hotel Reservation Terms'
  const totalPriceLabel = formatCurrency(totalPrice, i18n.language, reservation.currency)
  const pricePerNightLabel = formatCurrency(room.pricePerNight, i18n.language, reservation.currency)
  const stayLengthLabel = stayLength > 0 ? `${stayLength} night${stayLength > 1 ? 's' : ''}` : '-'

  const bookingDetails = useMemo(
    () =>
      buildBookingDetailItems({
        hotelName: reservation.hotelName,
        roomNumber: reservation.roomNumber,
        roomTypeLabel: roomType.label,
        checkInLabel: formatBookingDate(reservation.checkIn, i18n.language),
        checkOutLabel: formatBookingDate(reservation.checkOut, i18n.language),
        stayLengthLabel,
        guests: reservation.guests,
        rooms: reservation.rooms,
        capacityLabel: `${room.capacity} guests`,
      }),
    [
      i18n.language,
      reservation.checkIn,
      reservation.checkOut,
      reservation.guests,
      reservation.hotelName,
      reservation.roomNumber,
      reservation.rooms,
      room.capacity,
      roomType.label,
      stayLengthLabel,
    ]
  )

  useEffect(() => {
    if (!open) {
      setActiveStep(0)
      setTermsAccepted(false)
      setSignatureDataUrl('')
      setStepError('')
    }
  }, [open])

  const validateCurrentStep = () => {
    const validationError = createConfirmationStepStrategy(currentStep.id).validate?.({
      signatureDataUrl,
      termsAccepted,
    })

    if (validationError) {
      setStepError(validationError)
      return false
    }

    setStepError('')
    return true
  }

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return
    }

    setActiveStep(currentStep =>
      Math.min(currentStep + 1, BOOKING_CONFIRMATION_STEPS.length - 1)
    )
  }

  const handleBack = () => {
    setStepError('')
    setActiveStep(currentStep => Math.max(currentStep - 1, 0))
  }

  const handleConfirm = () => {
    if (!termsAccepted) {
      setActiveStep(getStepIndexById(BOOKING_CONFIRMATION_STEP_IDS.TERMS))
      setStepError('Please accept the terms and conditions before confirming.')
      return
    }

    if (!signatureDataUrl) {
      setActiveStep(getStepIndexById(BOOKING_CONFIRMATION_STEP_IDS.SIGNATURE))
      setStepError('Please add your signature before confirming.')
      return
    }

    setStepError('')
    onConfirm({
      termsAccepted,
      customerSignatureDataUrl: signatureDataUrl,
    })
  }

  return {
    activeStep,
    activeTerms,
    bookingDetails,
    currentStepId: currentStep.id,
    currentStepLabel: currentStep.label,
    handleBack,
    handleConfirm,
    handleNext,
    isFinalStep: currentStep.id === BOOKING_CONFIRMATION_STEP_IDS.REVIEW_CONFIRM,
    isFirstStep: currentStep.id === BOOKING_CONFIRMATION_STEP_IDS.BOOKING_DETAILS,
    pricePerNightLabel,
    roomTypeLabel: roomType.label,
    setSignatureDataUrl: (value: string) => {
      setSignatureDataUrl(value)
      setStepError('')
    },
    setTermsAccepted: (value: boolean) => {
      setTermsAccepted(value)
      setStepError('')
    },
    signatureDataUrl,
    stayLengthLabel,
    stepError,
    steps: BOOKING_CONFIRMATION_STEPS,
    termsAccepted,
    termsContent,
    termsLoading,
    termsTitle,
    totalPriceLabel,
  }
}
