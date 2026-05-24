'use client'

import { useState, type MouseEvent } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { CalendarDays, MoreVertical, PencilLine, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ReservationActionsMenuProps {
  canModify: boolean
  isBusy: boolean
  onEdit: () => void
  onExtend: () => void
  onCancel: () => void
}

export function ReservationActionsMenu({
  canModify,
  isBusy,
  onEdit,
  onExtend,
  onCancel,
}: ReservationActionsMenuProps) {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = anchorEl != null

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const runAction = (action: () => void) => {
    handleCloseMenu()
    action()
  }

  return (
    <>
      <IconButton
        size="small"
        aria-label={t('hotelPortal.booking.reservationActions', 'Reservation actions')}
        aria-controls={open ? 'reservation-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenMenu}
        sx={{ alignSelf: { xs: 'flex-end', md: 'flex-end' } }}
      >
        <MoreVertical size={18} />
      </IconButton>

      <Menu
        id="reservation-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled={!canModify || isBusy} onClick={() => runAction(onEdit)}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PencilLine size={15} />
            <Typography variant="inherit">{t('hotelPortal.booking.editReservation', 'Edit reservation')}</Typography>
          </Stack>
        </MenuItem>

        <MenuItem disabled={isBusy} onClick={() => runAction(onExtend)}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarDays size={15} />
            <Typography variant="inherit">{t('hotelPortal.booking.extendStay', 'Extend stay')}</Typography>
          </Stack>
        </MenuItem>

        <MenuItem disabled={isBusy} onClick={() => runAction(onCancel)} sx={{ color: 'error.main' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Trash2 size={15} />
            <Typography variant="inherit">{t('hotelPortal.booking.cancelReservation', 'Cancel reservation')}</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  )
}
