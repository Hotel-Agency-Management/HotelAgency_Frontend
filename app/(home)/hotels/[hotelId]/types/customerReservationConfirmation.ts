import type { ReactNode } from 'react'

export interface ReservationDetails {
  hotelName: string
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
}

export interface CustomerReservationConfirmationPayload {
  termsAccepted: boolean
  customerSignatureDataUrl: string
}

export interface ReservationSummaryItem {
  label: string
  value: ReactNode
}
