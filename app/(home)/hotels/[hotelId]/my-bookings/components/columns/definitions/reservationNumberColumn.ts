import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'

export const reservationNumberColumn: GridColDef<ReservationListItem> = {
  field: 'reservationNumber',
  headerName: 'Reservation #',
  flex: 1.2,
  minWidth: 170,
}
