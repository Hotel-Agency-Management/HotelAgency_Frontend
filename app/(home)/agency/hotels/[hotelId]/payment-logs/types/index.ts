export type PaymentType =
  | 'Booking'
  | 'Cancellation'
  | 'ReservationInsurance'
  | 'YearlyInsurance'
  | 'Extend'
  | 'Damage'
  | 'Refund'

export interface PaymentLog {
  id: number
  type: PaymentType
  amount: number
  from: number
  fromName: string
  to: number
  toName: string
  reservationId?: number
  createdAt: string
  status?: string
}

export interface PaginatedPaymentLogs {
  items: PaymentLog[]
  totalCount: number
  totalAmount: number
  page: number
  pageSize: number
}

export interface PaymentLogsParams {
  page?: number
  pageSize?: number
}
