import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const totalAmountColumn: GridColDef<ReservationListItem> = {
  field: 'totalAmount',
  headerName: 'Total',
  flex: 0.9,
  minWidth: 110,
  valueFormatter: (value: number) =>
    `$${Number(value).toLocaleString()}`,
}
