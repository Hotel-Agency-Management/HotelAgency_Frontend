import dayjs from 'dayjs'
import { z } from 'zod'
import { ROOM_TYPES, type RoomKind } from '@/app/(home)/room-types/constants/roomTypes'

export const PAYMENT_METHODS = ['Cash', 'Card', 'Bank Transfer'] as const
export const RESERVATION_SOURCES = ['Phone', 'Walk-in'] as const

export const ROOM_TYPE_OPTIONS = (Object.keys(ROOM_TYPES) as RoomKind[]).map(value => ({
  value,
  label: ROOM_TYPES[value].label,
}))

export interface DirectReservationFormInput {
  fullName: string
  phoneNumber: string
  email: string
  idOrPassportNumber: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number | ''
  numberOfRooms: number | ''
  roomType: string
  paymentMethod: string
  paidAmount: number | ''
  remainingAmount: number
  totalAmount: number
  specialRequests: string
  reservationSource: string
  notes: string
  signatureDataUrl: string
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

const requiredRoomTypeField = z
  .string()
  .trim()
  .min(1, 'Room type is required')
  .refine((value): value is RoomKind => ROOM_TYPE_OPTIONS.some(option => option.value === value), {
    message: 'Room type is invalid',
  })
  .transform(value => value as RoomKind)

export const directReservationSchema = z
  .object({
    fullName: requiredTextField('Full name'),
    phoneNumber: requiredTextField('Phone number'),
    email: requiredTextField('Email').email('Email must be a valid email address'),
    idOrPassportNumber: requiredTextField('ID / Passport number'),
    checkInDate: requiredDateField('Check-in date'),
    checkOutDate: requiredDateField('Check-out date'),
    numberOfGuests: requiredNumberField('Number of guests', 1),
    numberOfRooms: requiredNumberField('Number of rooms', 1),
    roomType: requiredRoomTypeField,
    paymentMethod: requiredEnumField(PAYMENT_METHODS, 'Payment method'),
    paidAmount: requiredNumberField('Paid amount', 0),
    remainingAmount: z.number({
      required_error: 'Remaining amount is required',
      invalid_type_error: 'Remaining amount is invalid',
    }),
    totalAmount: z
      .number({
        required_error: 'Total amount is required',
        invalid_type_error: 'Total amount is invalid',
      })
      .min(0, 'Total amount must be at least 0'),
    specialRequests: z.string().trim(),
    reservationSource: requiredEnumField(RESERVATION_SOURCES, 'Reservation source'),
    notes: z.string().trim(),
    signatureDataUrl: requiredTextField('Signature'),
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
    fullName: '',
    phoneNumber: '',
    email: '',
    idOrPassportNumber: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    numberOfRooms: 1,
    roomType: '',
    paymentMethod: '',
    paidAmount: 0,
    remainingAmount: totalAmount,
    totalAmount,
    specialRequests: '',
    reservationSource: '',
    notes: '',
    signatureDataUrl: '',
  }
}
