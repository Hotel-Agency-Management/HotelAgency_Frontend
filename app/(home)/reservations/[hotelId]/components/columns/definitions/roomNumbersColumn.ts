import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createRoomNumbersColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'roomNumbers',
    headerName: t('reservations.table.rooms', 'Rooms'),
    flex: 0.9,
    minWidth: 120,
    sortable: false,
    valueGetter: (_value: unknown, row: ReservationListItem) => row.roomNumbers.join(', '),
  }
}
