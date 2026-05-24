import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createReservationNumberColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'reservationNumber',
    headerName: t('reservations.table.reservationNumber', 'Reservation #'),
    flex: 1.2,
    minWidth: 160,
  }
}
