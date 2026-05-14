import type { ReservationListItem } from '../../config/reservationConfig'

export type ReservationColumnKey =
  | 'reservationNumber'
  | 'guestFullName'
  | 'roomNumbers'
  | 'status'
  | 'checkInDate'
  | 'checkOutDate'
  | 'totalAmount'
  | 'actions'

export type ReservationColumnContext = {
  onExtend: (row: ReservationListItem) => void
  onUpdate: (row: ReservationListItem) => void
  onCancel: (row: ReservationListItem) => void
}
