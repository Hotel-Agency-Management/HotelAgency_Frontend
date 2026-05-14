import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const checkInDateColumn: GridColDef<ReservationListItem> = {
  field: 'checkInDate',
  headerName: 'Check-In',
  flex: 1,
  minWidth: 120,
  valueFormatter: (value: string) =>
    value ? new Date(value).toLocaleDateString('en-GB') : '—',
}
