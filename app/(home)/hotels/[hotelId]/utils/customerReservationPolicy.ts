import dayjs from 'dayjs'
import {
  CUSTOMER_RESERVATION_STATUS,
  type CustomerReservation,
} from '../types/customerReservation'
import { getStayLength } from './roomBooking'

export const RESERVATION_POLICY = {
  modificationWindowHours: 24,
  cancellationPenaltyDaysBeforeCheckIn: 3,
  defaultCancellationFeeRate: 0.4,
} as const

export const formatPolicyPercentage = (rate: number) => `${Math.round(rate * 100)}%`

const roundCurrency = (value: number) => Math.round(value * 100) / 100

export const normalizeCancellationFeeRate = (rate?: number | null) => {
  if (rate == null || !Number.isFinite(rate)) {
    return RESERVATION_POLICY.defaultCancellationFeeRate
  }

  return Math.min(Math.max(rate > 1 ? rate / 100 : rate, 0), 1)
}

export const calculateReservationTotal = (
  nightlyRate: number,
  checkIn: string,
  checkOut: string,
  rooms: number
) => roundCurrency(nightlyRate * getStayLength(checkIn, checkOut) * rooms)

export const calculateReservationExtensionTotal = (
  extendPrice: number,
  currentCheckOut: string,
  newCheckOut: string
) => roundCurrency(extendPrice * getStayLength(currentCheckOut, newCheckOut))

export const isValidReservationRange = (checkIn: string, checkOut: string) =>
  dayjs(checkIn).isValid() && dayjs(checkOut).isValid() && dayjs(checkOut).isAfter(dayjs(checkIn), 'day')

export const rangesOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
) => dayjs(startA).isBefore(dayjs(endB), 'day') && dayjs(startB).isBefore(dayjs(endA), 'day')

export const getReservationEditDeadline = (createdAt: string) =>
  dayjs(createdAt).add(RESERVATION_POLICY.modificationWindowHours, 'hour').toISOString()

export const getFreeCancellationDeadline = (checkIn: string) =>
  dayjs(checkIn).subtract(RESERVATION_POLICY.cancellationPenaltyDaysBeforeCheckIn, 'day').toISOString()

export const canModifyReservation = (reservation: CustomerReservation, now = dayjs()) =>
  reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED &&
  now.isBefore(dayjs(getReservationEditDeadline(reservation.createdAt)))

export const isFreeCancellationEligible = (reservation: CustomerReservation, now = dayjs()) =>
  reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED &&
  now.isBefore(dayjs(getFreeCancellationDeadline(reservation.checkIn)))

export const calculateCancellationFee = (
  reservation: CustomerReservation,
  fallbackCancellationFeeRate?: number | null
) =>
  isFreeCancellationEligible(reservation)
    ? 0
    : roundCurrency(
        reservation.totalPrice *
          normalizeCancellationFeeRate(reservation.cancellationFeeRate ?? fallbackCancellationFeeRate)
      )

interface AvailabilityConflictOptions {
  checkIn: string
  checkOut: string
  excludeReservationId?: string
}

export const findAvailabilityConflict = (
  reservations: CustomerReservation[],
  { checkIn, checkOut, excludeReservationId }: AvailabilityConflictOptions
) => {
  if (!isValidReservationRange(checkIn, checkOut)) {
    return null
  }

  return (
    reservations.find(reservation => {
      if (reservation.status !== CUSTOMER_RESERVATION_STATUS.CONFIRMED) {
        return false
      }

      if (excludeReservationId != null && reservation.id === excludeReservationId) {
        return false
      }

      return rangesOverlap(checkIn, checkOut, reservation.checkIn, reservation.checkOut)
    }) ?? null
  )
}
