import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config'

export const checkInDateColumn: GridColDef<ReservationListItem> = {
  field: 'checkInDate',
  headerName: 'Check-in',
  flex: 0.9,
  minWidth: 120,
}
