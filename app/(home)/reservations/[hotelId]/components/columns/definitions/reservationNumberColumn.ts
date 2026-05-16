import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const reservationNumberColumn: GridColDef<ReservationListItem> = {
  field: 'reservationNumber',
  headerName: 'Reservation #',
  flex: 1.2,
  minWidth: 160,
}
