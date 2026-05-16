import type { DataGridColumnRegistry } from '@/core/utils/dataGridColumns'
import { reservationNumberColumn } from '../components/columns/definitions/reservationNumberColumn'
import { guestNameColumn } from '../components/columns/definitions/guestNameColumn'
import { roomNumbersColumn } from '../components/columns/definitions/roomNumbersColumn'
import { statusColumn } from '../components/columns/definitions/statusColumn'
import { checkInDateColumn } from '../components/columns/definitions/checkInDateColumn'
import { checkOutDateColumn } from '../components/columns/definitions/checkOutDateColumn'
import { totalAmountColumn } from '../components/columns/definitions/totalAmountColumn'
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
  reservationNumber: reservationNumberColumn,
  guestFullName: guestNameColumn,
  roomNumbers: roomNumbersColumn,
  checkInDate: checkInDateColumn,
  checkOutDate: checkOutDateColumn,
  status: statusColumn,
  totalAmount: totalAmountColumn,
  actions: createActionsColumn,
} satisfies DataGridColumnRegistry<ReservationColumnKey, ReservationListItem, ReservationColumnContext>
