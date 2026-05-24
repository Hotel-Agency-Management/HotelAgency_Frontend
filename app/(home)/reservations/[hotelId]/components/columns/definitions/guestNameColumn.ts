import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createGuestNameColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'guestFullName',
    headerName: t('reservations.table.guestName', 'Guest Name'),
    flex: 1.2,
    minWidth: 160,
  }
}
