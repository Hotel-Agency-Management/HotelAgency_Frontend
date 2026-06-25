export type PaymentType =
  | 'Booking'
  | 'Cancellation'
  | 'ReservationInsurance'
  | 'YearlyInsurance'
  | 'Extend'
  | 'Damage'
  | 'Refund'

export type PaymentDirection = 'Incoming' | 'Outgoing'

export interface PaymentLogsFilters {
  search: string
  transactionType: PaymentDirection | ''
  type: PaymentType | ''
}

export type PaymentViewMode = 'feed' | 'excel'

export interface PaymentViewToggleProps {
  value: PaymentViewMode
  onChange: (value: PaymentViewMode) => void
}
