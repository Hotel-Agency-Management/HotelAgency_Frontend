import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'

export const checkOutDateColumn: GridColDef<ReservationListItem> = {
  field: 'checkOutDate',
  headerName: 'Check-out',
  flex: 0.9,
  minWidth: 120,
}
