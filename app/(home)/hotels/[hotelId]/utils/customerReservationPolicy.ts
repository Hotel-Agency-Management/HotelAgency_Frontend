import dayjs from 'dayjs'
import {
  CUSTOMER_RESERVATION_STATUS,
  type CustomerReservation,
} from '../types/customerReservation'
import { getStayLength } from './roomBooking'

export const RESERVATION_POLICY = {
  modificationWindowHours: 24,
  freeCancellationWindowHours: 6,
  lateCancellationFeeRate: 0.2,
} as const

const roundCurrency = (value: number) => Math.round(value * 100) / 100

export const calculateReservationTotal = (
  nightlyRate: number,
  checkIn: string,
  checkOut: string,
  rooms: number
) => roundCurrency(nightlyRate * getStayLength(checkIn, checkOut) * rooms)

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

export const getFreeCancellationDeadline = (createdAt: string) =>
  dayjs(createdAt).add(RESERVATION_POLICY.freeCancellationWindowHours, 'hour').toISOString()

export const canModifyReservation = (reservation: CustomerReservation, now = dayjs()) =>
  reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED &&
  now.isBefore(dayjs(getReservationEditDeadline(reservation.createdAt)))

export const isFreeCancellationEligible = (reservation: CustomerReservation, now = dayjs()) =>
  reservation.status === CUSTOMER_RESERVATION_STATUS.CONFIRMED &&
  now.isBefore(dayjs(getFreeCancellationDeadline(reservation.createdAt)))

export const calculateCancellationFee = (reservation: CustomerReservation) =>
  isFreeCancellationEligible(reservation)
    ? 0
    : roundCurrency(reservation.totalPrice * RESERVATION_POLICY.lateCancellationFeeRate)

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

