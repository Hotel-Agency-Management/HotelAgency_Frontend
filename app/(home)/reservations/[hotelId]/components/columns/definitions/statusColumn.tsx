import type { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import type { ReservationColumnContext } from '../types'
import type { ReservationListItem } from '../../../config/reservationConfig'
import { STATUS_COLOR } from '../../../constants/status'

const STATUS_LABEL_KEY: Record<string, string> = {
  Confirmed: 'reservations.status.confirmed',
  Pending: 'reservations.status.pending',
  Cancelled: 'reservations.status.cancelled',
  CheckedIn: 'reservations.status.checkedIn',
  CheckedOut: 'reservations.status.checkedOut',
  Completed: 'reservations.status.completed',
}

export function createStatusColumn({ t }: ReservationColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'status',
    headerName: t('reservations.table.status', 'Status'),
    flex: 0.9,
    minWidth: 130,
    renderCell: ({ value }) => (
      <Chip
        label={t(STATUS_LABEL_KEY[value as string] ?? '', value as string)}
        color={STATUS_COLOR[value as string] ?? 'default'}
        size="small"
        variant="outlined"
      />
    ),
  }
}
