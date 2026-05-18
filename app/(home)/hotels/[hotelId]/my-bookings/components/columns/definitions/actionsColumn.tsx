import { IconButton, Tooltip } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { Eye } from 'lucide-react'
import type { ReservationListItem } from '../../../config'
import type { BookingColumnContext } from '../types'

export function createActionsColumn({
  onViewDetail,
}: BookingColumnContext): GridColDef<ReservationListItem> {
  return {
    field: 'actions',
    headerName: '',
    flex: 0.5,
    minWidth: 80,
    sortable: false,
    filterable: false,
    renderCell: ({ row }) => (
      <Tooltip title="View booking" placement="top">
        <IconButton
          size="small"
          color="primary"
          aria-label="View booking"
          onClick={event => {
            event.stopPropagation()
            onViewDetail(row.id)
          }}
        >
          <Eye size={18} />
        </IconButton>
      </Tooltip>
    ),
  }
}
