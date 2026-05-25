import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createCheckOutDateColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'checkOutDate',
    headerName: t('reservations.table.checkOut', { defaultValue: 'Check-Out' }),
    flex: 1,
    minWidth: 120,
    valueFormatter: (value: string) => (value ? new Date(value).toLocaleDateString('en-GB') : '—')
  }
}
