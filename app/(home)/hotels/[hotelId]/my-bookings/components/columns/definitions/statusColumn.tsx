import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'
import { BookingStatusChip } from '../../BookingStatusChip'

export const statusColumn: GridColDef<ReservationListItem> = {
  field: 'status',
  headerName: 'Status',
  flex: 0.8,
  minWidth: 130,
  renderCell: ({ value }) => <BookingStatusChip status={value as string} />,
}
