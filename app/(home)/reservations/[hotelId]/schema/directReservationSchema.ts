import dayjs from 'dayjs'
import { z } from 'zod'
import { TFunction } from 'i18next'
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

// ---------------------------------------------------------------------------
// Factory — call inside a hook/component with the reactive `t` from useTranslation
// ---------------------------------------------------------------------------

const requiredTextField = (t: TFunction, labelKey: string, fallbackLabel: string) =>
  z.string().trim().min(1, t('zodValidation.fieldRequired', { defaultValue: '{{label}} is required', label: t(labelKey, fallbackLabel), }))

const requiredDateField = (t: TFunction, labelKey: string, fallbackLabel: string) =>
  requiredTextField(t, labelKey, fallbackLabel).refine(value => dayjs(value).isValid(), {
    message: t('zodValidation.fieldInvalid', { defaultValue: '{{label}} is invalid', label: t(labelKey, fallbackLabel), }),
  })

const requiredNumberField = (t: TFunction, labelKey: string, fallbackLabel: string, min: number) =>
  z.preprocess(
    value => (value === '' || value === null || value === undefined ? undefined : value),
    z
      .number({
        required_error: t('zodValidation.fieldRequired', { defaultValue: '{{label}} is required', label: t(labelKey, fallbackLabel), }),
        invalid_type_error: t('zodValidation.fieldRequired', { defaultValue: '{{label}} is required', label: t(labelKey, fallbackLabel), }),
      })
      .min(min, t('zodValidation.fieldMin', { defaultValue: '{{label}} must be at least {{min}}', label: t(labelKey, fallbackLabel),
        min, }))
  )

const requiredEnumField = <T extends readonly string[]>(
  t: TFunction,
  values: T,
  labelKey: string,
  fallbackLabel: string
) =>
  z
    .string()
    .trim()
    .min(1, t('zodValidation.fieldRequired', { defaultValue: '{{label}} is required', label: t(labelKey, fallbackLabel), }))
    .refine((value): value is T[number] => values.includes(value as T[number]), {
      message: t('zodValidation.fieldInvalid', { defaultValue: '{{label}} is invalid', label: t(labelKey, fallbackLabel), }),
    })
    .transform(value => value as T[number])

export const createDirectReservationSchema = (t: TFunction) =>
  z
    .object({
      guestFullName: requiredTextField(t, 'zodValidation.labels.guestFullName', 'Guest full name'),
      guestPhone: requiredTextField(t, 'zodValidation.labels.guestPhone', 'Guest phone'),
      guestEmail: requiredTextField(t, 'zodValidation.labels.guestEmail', 'Guest email').email(
        t('zodValidation.validEmail', { defaultValue: 'Email must be a valid email address' })
      ),
      guestIdNumber: z.string().trim(),
      checkInDate: requiredDateField(t, 'zodValidation.labels.checkInDate', 'Check-in date'),
      checkOutDate: requiredDateField(t, 'zodValidation.labels.checkOutDate', 'Check-out date'),
      numberOfGuests: requiredNumberField(t, 'zodValidation.labels.numberOfGuests', 'Number of guests', 1),
      roomNumbers: z
        .array(requiredTextField(t, 'zodValidation.labels.roomNumber', 'Room number'))
        .min(1, t('zodValidation.atLeastOneRoomRequired', { defaultValue: 'At least one room is required' })),
      totalAmount: z
        .number({
          required_error: t('zodValidation.totalAmountRequired', { defaultValue: 'Total amount is required' }),
          invalid_type_error: t('zodValidation.totalAmountInvalid', { defaultValue: 'Total amount is invalid' }),
        })
        .min(0, t('zodValidation.totalAmountMin0', { defaultValue: 'Total amount must be at least 0' })),
      specialRequests: z.string().trim(),
      source: requiredEnumField(
        t,
        Object.values(ReservationSource) as [ReservationSource, ...ReservationSource[]],
        'zodValidation.labels.reservationSource',
        'Reservation source'
      ),
      notes: z.string().trim(),
      employeeSignatureDataUrl: z.string(),
    })
    .superRefine((values, ctx) => {
      if (!dayjs(values.checkOutDate).isAfter(dayjs(values.checkInDate))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('zodValidation.checkOutAfterCheckIn', { defaultValue: 'Check-out date must be after check-in date' }),
          path: ['checkOutDate'],
        })
      }
    })

export type DirectReservationFormValues = z.infer<ReturnType<typeof createDirectReservationSchema>>

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
