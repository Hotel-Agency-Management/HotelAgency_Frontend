import { createDataGridColumnsFactory } from '@/core/utils/dataGridColumns'
import { COLUMN_STRATEGIES, DEFAULT_COLUMN_ORDER } from '../../constants/listColumns'
import type { ReservationColumnContext, ReservationColumnKey } from './types'
import type { ReservationListItem } from '../../config/reservationConfig'
import type { GridColDef } from '@mui/x-data-grid'

const buildReservationColumns = createDataGridColumnsFactory(COLUMN_STRATEGIES)

export function getReservationListColumns(
  context: ReservationColumnContext,
  columnOrder: readonly ReservationColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<ReservationListItem>[] {
  return buildReservationColumns(context, columnOrder)
}
