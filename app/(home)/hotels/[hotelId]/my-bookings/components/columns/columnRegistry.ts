import type { GridColDef } from '@mui/x-data-grid'
import { createDataGridColumnsFactory } from '@/core/utils/dataGridColumns'
import { COLUMN_STRATEGIES, DEFAULT_COLUMN_ORDER } from '../../constants/columns'
import type { ReservationListItem } from '../../types'
import type { BookingColumnContext, BookingColumnKey } from './types'

const buildMyBookingsColumns = createDataGridColumnsFactory(COLUMN_STRATEGIES)

export function getMyBookingsGridColumns(
  context: BookingColumnContext,
  columnOrder: readonly BookingColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<ReservationListItem>[] {
  return buildMyBookingsColumns(context, columnOrder)
}
