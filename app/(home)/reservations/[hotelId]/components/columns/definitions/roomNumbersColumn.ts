import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../config/reservationConfig'

export const roomNumbersColumn: GridColDef<ReservationListItem> = {
  field: 'roomNumbers',
  headerName: 'Rooms',
  flex: 0.9,
  minWidth: 120,
  sortable: false,
  valueGetter: (_value: unknown, row: ReservationListItem) => row.roomNumbers.join(', '),
}
