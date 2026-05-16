'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { HOTEL_TERMS_STATUSES } from '@/app/(home)/agency/hotels/terms-and-conditions/constants/status'
import { useHotelTerms } from '@/app/(home)/agency/hotels/terms-and-conditions/hooks/useHotelTermsQueries'
import { useAuth } from '@/core/context/AuthContext'
import { useReservationTaxEstimate } from '../invoice/hooks/useReservationTaxEstimate'
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
import type { ReservationContractData } from '../types/customerReservationContract'
import {
  formatBookingDate,
  formatCurrency,
  getStayLength,
  getTotalReservationPrice,
} from '../utils/roomBooking'

interface UseCustomerReservationConfirmationModalOptions {
  open: boolean
  hotelId: string
  hotel: CustomerHotel | null
  room: Pick<RoomProfile, 'type' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'yearlyInsurance' | 'insurancePerReservation'>
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
  hotel,
  room,
  reservation,
  onConfirm,
}: UseCustomerReservationConfirmationModalOptions) {
  const { i18n } = useTranslation()
  const { user } = useAuth()
  const { data: hotelTerms, isLoading: termsLoading } = useHotelTerms(hotelId)
  const [activeStep, setActiveStep] = useState(0)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [contractPreviewAccepted, setContractPreviewAccepted] = useState(false)
  const [signatureDataUrl, setSignatureDataUrl] = useState('')
  const [stepError, setStepError] = useState('')
  const [includeInsurance, setIncludeInsurance] = useState(false)

  const roomType = ROOM_TYPES[room.type]
  const currentStep = BOOKING_CONFIRMATION_STEPS[activeStep] ?? BOOKING_CONFIRMATION_STEPS[0]
  const stayLength = getStayLength(reservation.checkIn, reservation.checkOut)
  const totalPrice = getTotalReservationPrice(room.pricePerNight, stayLength, reservation.rooms)
  const {
    taxAmount,
    taxLoading,
    taxPostalCode,
    taxRequiresPostalCode,
    setTaxPostalCode,
    resolvedTaxPostalCode,
  } = useReservationTaxEstimate({
    open,
    hotel,
    subtotal: totalPrice ?? 0,
  })
  const estimatedTotal = (totalPrice ?? 0) + (taxAmount ?? 0)
  const activeTerms = hotelTerms?.status === HOTEL_TERMS_STATUSES.ACTIVE ? hotelTerms : null

  const termsContent = activeTerms?.content ?? FALLBACK_TERMS_CONTENT
  const termsTitle = activeTerms?.title ?? 'Hotel Reservation Terms'
  const guestName =
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email ||
    'Guest customer'
  const totalPriceLabel = formatCurrency(totalPrice, i18n.language, reservation.currency)
  const taxAmountLabel = taxLoading
    ? 'Calculating...'
    : taxAmount == null
      ? 'Tax unavailable'
      : formatCurrency(taxAmount, i18n.language, reservation.currency)
  const estimatedTotalLabel = formatCurrency(estimatedTotal, i18n.language, reservation.currency)
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

  const contractPreview = useMemo<ReservationContractData>(
    () => ({
      issuedAt: new Date().toISOString(),
      hotel: {
        name: hotel?.name ?? reservation.hotelName,
        agencyName: hotel?.agencyName,
        phone: hotel?.phone,
        country: hotel?.country,
        city: hotel?.city,
        address: hotel?.address,
        logo: hotel?.logo ?? hotel?.branding.logo,
        primaryColor: hotel?.branding.colors.primary,
        secondaryColor: hotel?.branding.colors.secondary,
      },
      guest: {
        name: guestName,
        email: user?.email,
        phone: user?.phoneNumber,
      },
      stay: {
        reservationId: 'Preview',
        roomNumber: reservation.roomNumber,
        roomType: roomType.label,
        checkIn: formatBookingDate(reservation.checkIn, i18n.language),
        checkOut: formatBookingDate(reservation.checkOut, i18n.language),
        stayLength: stayLengthLabel,
        guests: reservation.guests,
        rooms: reservation.rooms,
        capacity: `${room.capacity} guests`,
      },
      terms: {
        title: termsTitle,
        content: termsContent,
        acceptedAt: new Date().toISOString(),
      },
      customerSignatureDataUrl: '',
    }),
    [
      guestName,
      hotel,
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
      termsContent,
      termsTitle,
      user?.email,
      user?.phoneNumber,
    ]
  )

  useEffect(() => {
    if (!open) {
      setActiveStep(0)
      setTermsAccepted(false)
      setContractPreviewAccepted(false)
      setSignatureDataUrl('')
      setStepError('')
      setIncludeInsurance(false)
    }
  }, [open])

  const validateCurrentStep = () => {
    const validationError = createConfirmationStepStrategy(currentStep.id).validate?.({
      signatureDataUrl,
      contractPreviewAccepted,
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
      acceptedTermsTitle: termsTitle,
      acceptedTermsContent: termsContent,
      taxPostalCode: resolvedTaxPostalCode,
      includeInsurance,
    })
  }

  const hasInsurance = (room.yearlyInsurance ?? 0) > 0
  const insuranceFeeLabel = hasInsurance
    ? formatCurrency(room.insurancePerReservation!, i18n.language, reservation.currency)
    : null

  return {
    activeStep,
    activeTerms,
    bookingDetails,
    contractPreview,
    contractPreviewAccepted,
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
    setContractPreviewAccepted: (value: boolean) => {
      setContractPreviewAccepted(value)
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
    taxAmountLabel,
    taxPostalCode,
    taxRequiresPostalCode,
    setTaxPostalCode,
    estimatedTotalLabel,
    totalPriceLabel,
    hasInsurance,
    insuranceFeeLabel,
    includeInsurance,
    setIncludeInsurance,
  }
}
