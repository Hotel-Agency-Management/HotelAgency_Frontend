export type BookingColumnKey =
  | 'reservationNumber'
  | 'status'
  | 'checkInDate'
  | 'checkOutDate'
  | 'rooms'
  | 'totalAmount'
  | 'actions'

export interface BookingColumnContext {
  onViewDetail: (id: number) => void
}
