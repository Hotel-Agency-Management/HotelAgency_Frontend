export type PaymentType =
  | 'Booking'
  | 'Cancellation'
  | 'ReservationInsurance'
  | 'YearlyInsurance'
  | 'Extend'
  | 'Damage'
  | 'Refund'

export type PaymentViewMode = 'feed' | 'excel'

export interface PaymentViewToggleProps {
  value: PaymentViewMode
  onChange: (value: PaymentViewMode) => void
}
