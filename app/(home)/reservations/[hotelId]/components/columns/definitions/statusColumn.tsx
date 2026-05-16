import type { GridColDef } from '@mui/x-data-grid'
import { Chip } from '@mui/material'
import type { ReservationListItem } from '../../../config/reservationConfig'
import { STATUS_COLOR } from '../../../constants/status'

export const statusColumn: GridColDef<ReservationListItem> = {
  field: 'status',
  headerName: 'Status',
  flex: 0.9,
  minWidth: 130,
  renderCell: ({ value }) => (
    <Chip
      label={value}
      color={STATUS_COLOR[value as string] ?? 'default'}
      size="small"
      variant="outlined"
    />
  ),
}
