import type { ReactNode } from 'react'

export const BOOKING_CONFIRMATION_STEP_IDS = {
  BOOKING_DETAILS: 'bookingDetails',
  TERMS: 'terms',
  CONTRACT_PREVIEW: 'contractPreview',
  SIGNATURE: 'signature',
  REVIEW_CONFIRM: 'reviewConfirm',
} as const

export const BOOKING_CONFIRMATION_STEPS = [
  { id: BOOKING_CONFIRMATION_STEP_IDS.BOOKING_DETAILS, label: 'Booking Details' },
  { id: BOOKING_CONFIRMATION_STEP_IDS.TERMS, label: 'Terms & Conditions' },
  { id: BOOKING_CONFIRMATION_STEP_IDS.CONTRACT_PREVIEW, label: 'Contract Preview' },
  { id: BOOKING_CONFIRMATION_STEP_IDS.SIGNATURE, label: 'Signature' },
  { id: BOOKING_CONFIRMATION_STEP_IDS.REVIEW_CONFIRM, label: 'Review & Confirm' },
] as const

export type BookingConfirmationStep = (typeof BOOKING_CONFIRMATION_STEPS)[number]
export type BookingConfirmationStepId = BookingConfirmationStep['id']

export const FALLBACK_TERMS_CONTENT =
  'By confirming this reservation, you agree to the hotel check-in and check-out rules, occupancy limits, cancellation policy, and responsibility for any incidental charges or room damage during the stay.'

const BOOKING_DETAIL_FIELDS = [
  { key: 'hotelName', label: 'Hotel' },
  { key: 'roomNumber', label: 'Room' },
  { key: 'roomTypeLabel', label: 'Room type' },
  { key: 'checkInLabel', label: 'Check-in' },
  { key: 'checkOutLabel', label: 'Check-out' },
  { key: 'stayLengthLabel', label: 'Length of stay' },
  { key: 'guests', label: 'Guests' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'capacityLabel', label: 'Capacity' },
] as const

type BookingDetailFieldKey = (typeof BOOKING_DETAIL_FIELDS)[number]['key']

export type BookingDetailValues = Record<BookingDetailFieldKey, ReactNode>

export const buildBookingDetailItems = (values: BookingDetailValues) =>
  BOOKING_DETAIL_FIELDS.map(field => ({
    label: field.label,
    value: values[field.key],
  }))
