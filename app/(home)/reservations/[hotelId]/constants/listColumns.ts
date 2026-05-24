import type { DataGridColumnRegistry } from '@/core/utils/dataGridColumns'
import { createReservationNumberColumn } from '../components/columns/definitions/reservationNumberColumn'
import { createGuestNameColumn } from '../components/columns/definitions/guestNameColumn'
import { createRoomNumbersColumn } from '../components/columns/definitions/roomNumbersColumn'
import { createStatusColumn } from '../components/columns/definitions/statusColumn'
import { createCheckInDateColumn } from '../components/columns/definitions/checkInDateColumn'
import { createCheckOutDateColumn } from '../components/columns/definitions/checkOutDateColumn'
import { createTotalAmountColumn } from '../components/columns/definitions/totalAmountColumn'
import { createActionsColumn } from '../components/columns/definitions/actionsColumn'
import type { ReservationColumnContext, ReservationColumnKey } from '../components/columns/types'
import type { ReservationListItem } from '../config/reservationConfig'

export const DEFAULT_COLUMN_ORDER: ReservationColumnKey[] = [
  'reservationNumber',
  'guestFullName',
  'roomNumbers',
  'checkInDate',
  'checkOutDate',
  'status',
  'totalAmount',
  'actions',
]

export const COLUMN_STRATEGIES = {
  reservationNumber: createReservationNumberColumn,
  guestFullName: createGuestNameColumn,
  roomNumbers: createRoomNumbersColumn,
  checkInDate: createCheckInDateColumn,
  checkOutDate: createCheckOutDateColumn,
  status: createStatusColumn,
  totalAmount: createTotalAmountColumn,
  actions: createActionsColumn,
} satisfies DataGridColumnRegistry<ReservationColumnKey, ReservationListItem, ReservationColumnContext>
