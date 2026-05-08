import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'

export const totalAmountColumn: GridColDef<ReservationListItem> = {
  field: 'totalAmount',
  headerName: 'Total Amount',
  flex: 0.8,
  minWidth: 130,
  valueGetter: (_value: unknown, row: ReservationListItem) => row.totalAmount.toLocaleString(),
}
