import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const checkOutDateColumn: GridColDef<ReservationListItem> = {
  field: 'checkOutDate',
  headerName: 'Check-Out',
  flex: 1,
  minWidth: 120,
  valueFormatter: (value: string) =>
    value ? new Date(value).toLocaleDateString('en-GB') : '—',
}
