export type PaymentType =
  | 'Booking'
  | 'Cancellation'
  | 'ReservationInsurance'
  | 'YearlyInsurance'
  | 'Extend'
  | 'Damage'
  | 'Refund'

export interface PaymentLogItem {
  paymentId: number
  reservationReference: string
  paymentType: PaymentType
  amount: number
  fromName: string
  toName: string
  createdAt: string
}

export interface PaymentLogTimelineEvent {
  event: string
  occurredAt: string
}

export interface PaymentLogDetails {
  paymentId: number
  paymentType: PaymentType
  amount: number
  createdAt: string
  reservationReference: string
  reservationId: number
  fromName: string
  toName: string
  timeline: PaymentLogTimelineEvent[]
}

export interface PaymentLogsGroup {
  weekStart: string
  weekEnd: string
  items: PaymentLogItem[]
}

export interface HotelPaymentLogsResponse {
  totalIncoming: number
  totalOutgoing: number
  incomingCount: number
  outgoingCount: number
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  groups: PaymentLogsGroup[]
}

export interface PaymentLogsParams {
  pageNumber?: number
  pageSize?: number
  type?: PaymentType
}
