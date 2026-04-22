import type { FieldPath } from 'react-hook-form'
import type { DirectReservationFormInput } from '../schema/directReservationSchema'

export interface DirectReservationStep {
  label: string
  description: string
  fields: FieldPath<DirectReservationFormInput>[]
}

export const DIRECT_RESERVATION_STEPS: DirectReservationStep[] = [
  {
    label: 'Guest',
    description: 'Guest identity and contact details',
    fields: ['fullName', 'phoneNumber', 'email', 'idOrPassportNumber'],
  },
  {
    label: 'Stay',
    description: 'Dates, occupancy, and room type',
    fields: ['checkInDate', 'checkOutDate', 'numberOfGuests', 'numberOfRooms', 'roomType'],
  },
  {
    label: 'Payment',
    description: 'Payment method and collected amount',
    fields: ['paymentMethod', 'paidAmount'],
  },
  {
    label: 'Additional',
    description: 'Source, requests, employee signature, and final confirmation',
    fields: ['reservationSource', 'signatureDataUrl'],
  },
]
