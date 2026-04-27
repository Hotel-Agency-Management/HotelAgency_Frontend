import type { CustomerInvoice } from '../invoice/types/customerInvoice'

export const CUSTOMER_RESERVATION_STATUS = {
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const

export type CustomerReservationStatus =
  (typeof CUSTOMER_RESERVATION_STATUS)[keyof typeof CUSTOMER_RESERVATION_STATUS]

export type CustomerReservationSource = 'customer' | 'external'

export interface CustomerReservation {
  id: string
  hotelId: string
  roomId: string
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  hotelCountry?: string
  hotelCity?: string
  hotelState?: string
  hotelAddress?: string
  hotelZip?: string
  roomNumber: string
  roomType?: string
  customerName?: string
  customerEmail?: string
  paymentMethod?: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
  nightlyRate: number
  extendPrice: number
  totalPrice: number
  status: CustomerReservationStatus
  source: CustomerReservationSource
  termsAcceptedAt?: string
  customerSignatureDataUrl?: string
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  cancellationFee?: number
  invoice?: CustomerInvoice
}

export interface CreateCustomerReservationInput {
  hotelId: string
  roomId: string
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  hotelCountry?: string
  hotelCity?: string
  hotelState?: string
  hotelAddress?: string
  hotelZip?: string
  roomNumber: string
  roomType?: string
  customerName?: string
  customerEmail?: string
  paymentMethod?: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
  nightlyRate: number
  extendPrice: number
  termsAccepted: boolean
  customerSignatureDataUrl: string
}

export interface UpdateCustomerReservationInput {
  reservationId: string
  roomId: string
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  nightlyRate: number
  extendPrice: number
}

export interface ExtendCustomerReservationInput {
  reservationId: string
  checkOut: string
}
