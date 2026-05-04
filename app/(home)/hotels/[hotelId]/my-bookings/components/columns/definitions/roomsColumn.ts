import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'

export const roomsColumn: GridColDef<ReservationListItem> = {
  field: 'roomNumbers',
  headerName: 'Rooms',
  flex: 0.9,
  minWidth: 120,
  sortable: false,
  valueGetter: (_value: unknown, row: ReservationListItem) => row.roomNumbers.join(', '),
}
