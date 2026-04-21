import type { CustomerReservation } from '../types/customerReservation'

export interface ReservationDetailsItem {
  label: string
  value: string
  emphasized?: boolean
}

interface BuildReservationDetailsItemsOptions {
  reservation: CustomerReservation
  stayLength: number
  formatReservationTimestamp: (value: string) => string
  formatBookingDate: (value: string) => string
  formatCurrencyValue: (value: number, currency: string) => string
}

export function buildReservationDetailsItems({
  reservation,
  stayLength,
  formatReservationTimestamp,
  formatBookingDate,
  formatCurrencyValue,
}: BuildReservationDetailsItemsOptions): ReservationDetailsItem[] {
  return [
    {
      label: 'Booked on',
      value: formatReservationTimestamp(reservation.createdAt),
    },
    {
      label: 'Check-in',
      value: formatBookingDate(reservation.checkIn),
    },
    {
      label: 'Check-out',
      value: formatBookingDate(reservation.checkOut),
    },
    {
      label: 'Stay length',
      value: `${stayLength} night${stayLength === 1 ? '' : 's'}`,
    },
    {
      label: 'Guests',
      value: String(reservation.guests),
    },
    {
      label: 'Rooms',
      value: String(reservation.rooms),
    },
    {
      label: 'Total',
      value: formatCurrencyValue(reservation.totalPrice, reservation.currency),
      emphasized: true,
    },
  ]
}

