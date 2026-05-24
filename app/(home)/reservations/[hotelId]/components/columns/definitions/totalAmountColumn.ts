import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'

export function createTotalAmountColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'totalAmount',
    headerName: t('reservations.table.total', 'Total'),
    flex: 0.9,
    minWidth: 110,
    valueFormatter: (value: number) =>
      `$${Number(value).toLocaleString()}`,
  }
}
