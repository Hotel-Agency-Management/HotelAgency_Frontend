import type { DataGridColumnRegistry } from '@/core/utils/dataGridColumns'
import { createActionsColumn } from '../components/columns/definitions/actionsColumn'
import { checkInDateColumn } from '../components/columns/definitions/checkInDateColumn'
import { checkOutDateColumn } from '../components/columns/definitions/checkOutDateColumn'
import { reservationNumberColumn } from '../components/columns/definitions/reservationNumberColumn'
import { roomsColumn } from '../components/columns/definitions/roomsColumn'
import { statusColumn } from '../components/columns/definitions/statusColumn'
import { totalAmountColumn } from '../components/columns/definitions/totalAmountColumn'
import type { BookingColumnContext, BookingColumnKey } from '../components/columns/types'
import type { ReservationListItem } from '../types'

export const DEFAULT_COLUMN_ORDER: BookingColumnKey[] = [
  'reservationNumber',
  'status',
  'checkInDate',
  'checkOutDate',
  'rooms',
  'totalAmount',
  'actions',
]

export const COLUMN_STRATEGIES = {
  reservationNumber: reservationNumberColumn,
  status: statusColumn,
  checkInDate: checkInDateColumn,
  checkOutDate: checkOutDateColumn,
  rooms: roomsColumn,
  totalAmount: totalAmountColumn,
  actions: createActionsColumn,
} satisfies DataGridColumnRegistry<BookingColumnKey, ReservationListItem, BookingColumnContext>
