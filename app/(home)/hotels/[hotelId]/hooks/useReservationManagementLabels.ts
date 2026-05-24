'use client'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { buildReservationDetailsItems } from '../constants/reservationDetails'
import type { CustomerReservation } from '../types/customerReservation'
import {
  formatPolicyPercentage,
  getFreeCancellationDeadline,
  getReservationEditDeadline,
  normalizeCancellationFeeRate,
} from '../utils/customerReservationPolicy'
import { formatBookingDate, formatCurrency } from '../utils/roomBooking'

interface UseReservationManagementLabelsOptions {
  currentReservation: CustomerReservation | null
  hotel: Pick<CustomerHotel, 'currency' | 'cancellationFeeRate'> | null
  stayLength: number
  cancellationFee: number
  language: string
}

export function useReservationManagementLabels({
  currentReservation,
  hotel,
  stayLength,
  cancellationFee,
  language,
}: UseReservationManagementLabelsOptions) {
  const { t } = useTranslation()
  const formatReservationTimestamp = useCallback(
    (value: string) =>
      new Intl.DateTimeFormat(language, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(value)),
    [language]
  )

  const formatCurrencyValue = useCallback(
    (value: number, currency: string) =>
      formatCurrency(value, language, currency || hotel?.currency || 'USD'),
    [language, hotel?.currency]
  )

  const detailsItems = currentReservation
    ? buildReservationDetailsItems({
        reservation: currentReservation,
        stayLength,
        t,
        formatReservationTimestamp,
        formatBookingDate: value => formatBookingDate(value, language),
        formatCurrencyValue,
      })
    : []

  const modificationDeadlineLabel = currentReservation
    ? formatReservationTimestamp(getReservationEditDeadline(currentReservation.createdAt))
    : ''
  const freeCancellationDeadlineLabel = currentReservation
    ? formatReservationTimestamp(getFreeCancellationDeadline(currentReservation.checkIn))
    : ''
  const cancellationFeeLabel = currentReservation
    ? formatCurrencyValue(cancellationFee, currentReservation.currency)
    : ''
  const cancellationFeeRate = normalizeCancellationFeeRate(
    currentReservation?.cancellationFeeRate ?? hotel?.cancellationFeeRate
  )
  const cancellationFeeRateLabel = formatPolicyPercentage(cancellationFeeRate)
  const reservationTotalLabel = currentReservation
    ? formatCurrencyValue(currentReservation.totalPrice, currentReservation.currency)
    : ''
  const refundAmountLabel = currentReservation
    ? formatCurrencyValue(
        Math.max(currentReservation.totalPrice - cancellationFee, 0),
        currentReservation.currency
      )
    : ''

  return {
    formatReservationTimestamp,
    formatCurrencyValue,
    detailsItems,
    modificationDeadlineLabel,
    freeCancellationDeadlineLabel,
    cancellationFeeLabel,
    cancellationFeeRate,
    cancellationFeeRateLabel,
    reservationTotalLabel,
    refundAmountLabel,
  }
}
