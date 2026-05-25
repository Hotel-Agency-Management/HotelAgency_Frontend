import type { TFunction } from 'i18next'
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
  t: TFunction
  onExtend: (row: ReservationListItem) => void
  onUpdate: (row: ReservationListItem) => void
  onCancel: (row: ReservationListItem) => void
  onUpdateStatus: (row: ReservationListItem) => void
  statusUpdatingId: number | null
}
