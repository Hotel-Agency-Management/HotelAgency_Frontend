import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createCheckInDateColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'checkInDate',
    headerName: t('reservations.table.checkIn', { defaultValue: 'Check-In' }),
    flex: 1,
    minWidth: 120,
    valueFormatter: (value: string) => (value ? new Date(value).toLocaleDateString('en-GB') : '—')
  }
}
