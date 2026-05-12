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
    fields: [
      'guestFullName',
      'guestPhone',
      'guestEmail',
      'guestIdNumber',
    ],
  },
  {
    label: 'Stay',
    description: 'Dates, occupancy, and assigned rooms',
    fields: [
      'checkInDate',
      'checkOutDate',
      'numberOfGuests',
      'roomNumbers',
    ],
  },
  {
    label: 'Payment',
    description: 'Review the calculated reservation total.',
    fields: ['totalAmount'],
  },
  {
    label: 'Reservation',
    description: 'Reservation source, additional notes, and employee signature',
    fields: [
      'source',
      'specialRequests',
      'notes',
      'employeeSignatureDataUrl',
    ],
  },
  {
    label: 'Confirm',
    description: 'Review and finalize the reservation',
    fields: [],
  },
]
