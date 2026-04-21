'use client'

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { DatePickerField } from '@/components/common/DatePickerField'
import type { ReservationEditRoomOption } from '../hooks/useReservationEdit'
import { formatCurrency } from '../utils/roomBooking'

interface EditReservationDialogProps {
  open: boolean
  canModify: boolean
  roomCapacity: number
  isBusy: boolean
  currency: string
  language: string
  nightlyRate: number
  roomOptions: ReservationEditRoomOption[]
  editForm: {
    roomId: string
    checkIn: string
    checkOut: string
    guests: number
    rooms: number
  }
  editFormHasValidRange: boolean
  editStayLength: number
  editConflict: {
    checkIn: string
    checkOut: string
  } | null
  onClose: () => void
  onSave: () => void
  onFieldChange: (
    key: 'roomId' | 'checkIn' | 'checkOut' | 'guests' | 'rooms',
    value: string | number
  ) => void
}

export function EditReservationDialog({
  open,
  canModify,
  roomCapacity,
  isBusy,
  currency,
  language,
  nightlyRate,
  roomOptions,
  editForm,
  editFormHasValidRange,
  editStayLength,
  editConflict,
  onClose,
  onSave,
  onFieldChange,
}: EditReservationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit reservation</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Alert severity={canModify ? 'info' : 'warning'}>
            {canModify
              ? 'You can edit this reservation because it is still within the first 24 hours.'
              : 'The 24-hour modification window has already ended.'}
          </Alert>

          <TextField
            select
            fullWidth
            size="small"
            label="Room"
            value={editForm.roomId}
            onChange={event => onFieldChange('roomId', event.target.value)}
          >
            {roomOptions.map(option => (
              <MenuItem key={option.id} value={option.id} disabled={option.disabled}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <DatePickerField
            label="Check-in"
            value={editForm.checkIn}
            minDate={dayjs().format('YYYY-MM-DD')}
            onChange={value => {
              onFieldChange('checkIn', value)

              if (editForm.checkOut && value && editForm.checkOut <= value) {
                onFieldChange('checkOut', '')
              }
            }}
          />

          <DatePickerField
            label="Check-out"
            value={editForm.checkOut}
            minDate={
              editForm.checkIn
                ? dayjs(editForm.checkIn).add(1, 'day').format('YYYY-MM-DD')
                : undefined
            }
            onChange={value => onFieldChange('checkOut', value)}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Guests"
              value={editForm.guests}
              inputProps={{ min: 1, max: roomCapacity }}
              onChange={event => onFieldChange('guests', Number(event.target.value))}
            />

            <TextField
              fullWidth
              size="small"
              type="number"
              label="Rooms"
              value={editForm.rooms}
              inputProps={{ min: 1 }}
              onChange={event => onFieldChange('rooms', Number(event.target.value))}
            />
          </Stack>

          {!editFormHasValidRange ? (
            <Alert severity="error">
              Check-out must be later than check-in by at least one day.
            </Alert>
          ) : null}

          {editForm.guests > roomCapacity ? (
            <Alert severity="error">
              This room can host up to {roomCapacity} guest{roomCapacity === 1 ? '' : 's'}.
            </Alert>
          ) : null}

          {editConflict != null ? (
            <Alert severity="error">
              The updated dates conflict with another reservation from {editConflict.checkIn} until{' '}
              {editConflict.checkOut}.
            </Alert>
          ) : null}

          <Typography variant="body2" color="text.secondary">
            Updated stay total:{' '}
            <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
              {formatCurrency(nightlyRate * editStayLength * editForm.rooms, language, currency)}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          disabled={
            !canModify ||
            editForm.roomId.length === 0 ||
            !editFormHasValidRange ||
            editForm.guests < 1 ||
            editForm.guests > roomCapacity ||
            editForm.rooms < 1 ||
            editConflict != null ||
            isBusy
          }
          onClick={onSave}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
