import dayjs from 'dayjs'
import { z } from 'zod'
import { ReservationSource } from '../config/reservationConfig'

export const RESERVATION_SOURCE_OPTIONS = Object.values(ReservationSource).map(value => ({
  value,
  label: value,
}))

export interface DirectReservationFormInput {
  guestFullName: string
  guestPhone: string
  guestEmail: string
  guestIdNumber: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number | ''
  roomNumbers: string[]
  totalAmount: number
  specialRequests: string
  source: ReservationSource | ''
  notes: string
  employeeSignatureDataUrl: string
}

const requiredTextField = (label: string) =>
  z.string().trim().min(1, `${label} is required`)

const requiredDateField = (label: string) =>
  requiredTextField(label).refine(value => dayjs(value).isValid(), {
    message: `${label} is invalid`,
  })

const requiredNumberField = (label: string, min: number) =>
  z.preprocess(
    value => (value === '' || value === null || value === undefined ? undefined : value),
    z
      .number({
        required_error: `${label} is required`,
        invalid_type_error: `${label} is required`,
      })
      .min(min, `${label} must be at least ${min}`)
  )

const requiredEnumField = <T extends readonly string[]>(values: T, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .refine((value): value is T[number] => values.includes(value as T[number]), {
      message: `${label} is invalid`,
    })
    .transform(value => value as T[number])

export const directReservationSchema = z
  .object({
    guestFullName: requiredTextField('Guest full name'),
    guestPhone: requiredTextField('Guest phone'),
    guestEmail: requiredTextField('Guest email').email('Email must be a valid email address'),
    guestIdNumber: z.string().trim(),
    checkInDate: requiredDateField('Check-in date'),
    checkOutDate: requiredDateField('Check-out date'),
    numberOfGuests: requiredNumberField('Number of guests', 1),
    roomNumbers: z.array(requiredTextField('Room number')).min(1, 'At least one room is required'),
    totalAmount: z
      .number({
        required_error: 'Total amount is required',
        invalid_type_error: 'Total amount is invalid',
      })
      .min(0, 'Total amount must be at least 0'),
    specialRequests: z.string().trim(),
    source: requiredEnumField(
      Object.values(ReservationSource) as [ReservationSource, ...ReservationSource[]],
      'Reservation source'
    ),
    notes: z.string().trim(),
    employeeSignatureDataUrl: z.string(),
  })
  .superRefine((values, ctx) => {
    if (!dayjs(values.checkOutDate).isAfter(dayjs(values.checkInDate))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Check-out date must be after check-in date',
        path: ['checkOutDate'],
      })
    }
  })

export type DirectReservationFormValues = z.infer<typeof directReservationSchema>

export function getDirectReservationDefaultValues(totalAmount: number): DirectReservationFormInput {
  return {
    guestFullName: '',
    guestPhone: '',
    guestEmail: '',
    guestIdNumber: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomNumbers: [],
    totalAmount,
    specialRequests: '',
    source: '',
    notes: '',
    employeeSignatureDataUrl: '',
  }
}
