import { Button } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import type { ReservationListItem } from '../../../types'
import type { BookingColumnContext } from '../types'

export function createActionsColumn({
  onViewDetail,
}: BookingColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'actions',
    headerName: '',
    flex: 0.5,
    minWidth: 110,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => (
      <Button size="small" variant="outlined" onClick={() => onViewDetail(row.id)}>
        View
      </Button>
    ),
  }
}
