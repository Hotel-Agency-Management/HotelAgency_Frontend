import type { GridColDef } from '@mui/x-data-grid'
import { CircularProgress, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useState, type MouseEvent } from 'react'
import { CalendarClock, LogIn, LogOut, MoreVertical, Pencil, XCircle } from 'lucide-react'
import type { ReservationListItem } from '../../../config/reservationConfig'
import { NEXT_STATUS_LABEL, NEXT_STATUS_VALUE } from '../../../constants/status'

type ActionParams = {
  onExtend: (row: ReservationListItem) => void
  onUpdate: (row: ReservationListItem) => void
  onCancel: (row: ReservationListItem) => void
  onUpdateStatus: (row: ReservationListItem) => void
  statusUpdatingId: number | null
}

function ReservationRowActions({
  row,
  onExtend,
  onUpdate,
  onCancel,
  onUpdateStatus,
  statusUpdatingId,
}: ActionParams & { row: ReservationListItem }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = anchorEl != null
  const isUpdatingStatus = statusUpdatingId === row.id
  const statusColor = row.status === 'Confirmed' ? 'success.main' : 'warning.main'

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => setAnchorEl(null)

  const runAction = (action: (row: ReservationListItem) => void) => {
    closeMenu()
    action(row)
  }

  return (
    <>
      <IconButton
        size="small"
        aria-label="Reservation actions"
        aria-controls={open ? `reservation-actions-${row.id}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
      >
        <MoreVertical size={18} />
      </IconButton>

      <Menu
        id={`reservation-actions-${row.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        onClick={event => event.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {NEXT_STATUS_VALUE[row.status] !== undefined ? (
          <MenuItem
            disabled={statusUpdatingId !== null}
            onClick={() => runAction(onUpdateStatus)}
            sx={theme => ({
              '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.08) },
            })}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ color: statusColor }}>
              {isUpdatingStatus ? (
                <CircularProgress size={16} color="inherit" />
              ) : row.status === 'Confirmed' ? (
                <LogIn size={15} />
              ) : (
                <LogOut size={15} />
              )}
              <Typography variant="inherit" color="text.primary">
                {NEXT_STATUS_LABEL[row.status]}
              </Typography>
            </Stack>
          </MenuItem>
        ) : null}

        <MenuItem
          onClick={() => runAction(onExtend)}
          sx={theme => ({
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
          })}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'primary.main' }}>
            <CalendarClock size={15} />
            <Typography variant="inherit" color="text.primary">
              Extend reservation
            </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => runAction(onUpdate)}
          sx={theme => ({
            '&:hover': { bgcolor: alpha(theme.palette.tertiary.main, 0.08) },
          })}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'tertiary.main' }}>
            <Pencil size={15} />
            <Typography variant="inherit" color="text.primary">
              Update reservation
            </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => runAction(onCancel)}
          sx={theme => ({
            color: 'error.main',
            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) },
          })}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <XCircle size={15} />
            <Typography variant="inherit">Cancel reservation</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  )
}

export function createActionsColumn({
  onExtend,
  onUpdate,
  onCancel,
  onUpdateStatus,
  statusUpdatingId,
}: ActionParams): GridColDef<ReservationListItem> {
  return {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 90,
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ row }) => (
      <ReservationRowActions
        row={row}
        onExtend={onExtend}
        onUpdate={onUpdate}
        onCancel={onCancel}
        onUpdateStatus={onUpdateStatus}
        statusUpdatingId={statusUpdatingId}
      />
    ),
  }
}
