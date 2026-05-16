import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const guestNameColumn: GridColDef<ReservationListItem> = {
  field: 'guestFullName',
  headerName: 'Guest Name',
  flex: 1.2,
  minWidth: 160,
}
