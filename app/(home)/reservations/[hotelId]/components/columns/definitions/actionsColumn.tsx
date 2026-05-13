import type { GridColDef } from '@mui/x-data-grid'
import { Tooltip } from '@mui/material'
import { CalendarClock, Pencil, XCircle } from 'lucide-react'
import type { ReservationListItem } from '../../../config/reservationConfig'
import { ActionIconButton, ActionsContainer } from './StyleComponent'

type ActionParams = {
  onExtend: (row: ReservationListItem) => void
  onUpdate: (row: ReservationListItem) => void
  onCancel: (row: ReservationListItem) => void
}

export function createActionsColumn({
  onExtend,
  onUpdate,
  onCancel,
}: ActionParams): GridColDef<ReservationListItem> {
  return {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 140,
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => (
      <ActionsContainer direction="row" gap={0.5} alignItems="center" justifyContent="center">
        <Tooltip title="Extend Reservation">
          <ActionIconButton
            size="small"
            actionColor="primary"
            onClick={event => {
              event.stopPropagation()
              onExtend(row)
            }}
          >
            <CalendarClock size={16} />
          </ActionIconButton>
        </Tooltip>
        <Tooltip title="Update Reservation">
          <ActionIconButton
            size="small"
            actionColor="secondary"
            onClick={event => {
              event.stopPropagation()
              onUpdate(row)
            }}
          >
            <Pencil size={16} />
          </ActionIconButton>
        </Tooltip>
        <Tooltip title="Cancel Reservation">
          <ActionIconButton
            size="small"
            actionColor="error"
            onClick={event => {
              event.stopPropagation()
              onCancel(row)
            }}
          >
            <XCircle size={16} />
          </ActionIconButton>
        </Tooltip>
      </ActionsContainer>
    ),
  }
}
