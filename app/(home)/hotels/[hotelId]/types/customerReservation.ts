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
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
  nightlyRate: number
  totalPrice: number
  status: CustomerReservationStatus
  source: CustomerReservationSource
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  cancellationFee?: number
}

export interface CreateCustomerReservationInput {
  hotelId: string
  roomId: string
  hotelName: string
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
  nightlyRate: number
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
}

export interface ExtendCustomerReservationInput {
  reservationId: string
  checkOut: string
}
