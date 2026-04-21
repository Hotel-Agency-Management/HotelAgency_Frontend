'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { DatePickerField } from '@/components/common/DatePickerField'
import { getStayLength, formatCurrency } from '../utils/roomBooking'

interface ExtendReservationDialogProps {
  open: boolean
  currentCheckOut: string
  currentCheckIn: string
  currentRooms: number
  nightlyRate: number
  language: string
  currency: string
  extendCheckOut: string
  extendHasValidRange: boolean
  extendConflict: {
    checkIn: string
    checkOut: string
  } | null
  isBusy: boolean
  onClose: () => void
  onConfirm: () => void
  onCheckOutChange: (value: string) => void
}

export function ExtendReservationDialog({
  open,
  currentCheckOut,
  currentCheckIn,
  currentRooms,
  nightlyRate,
  language,
  currency,
  extendCheckOut,
  extendHasValidRange,
  extendConflict,
  isBusy,
  onClose,
  onConfirm,
  onCheckOutChange,
}: ExtendReservationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Extend reservation</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Alert severity="info">
            Extend the reservation only if no other booking exists after your current check-out.
          </Alert>

          <DatePickerField
            label="New check-out"
            value={extendCheckOut}
            minDate={dayjs(currentCheckOut).add(1, 'day').format('YYYY-MM-DD')}
            onChange={onCheckOutChange}
          />

          {!extendHasValidRange ? (
            <Alert severity="error">
              The new check-out date must be later than your current check-out.
            </Alert>
          ) : null}

          {extendConflict != null ? (
            <Alert severity="error">
              Extension is not available because this room is already booked from {extendConflict.checkIn} until{' '}
              {extendConflict.checkOut}.
            </Alert>
          ) : null}

          <Typography variant="body2" color="text.secondary">
            New total:{' '}
            <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
              {formatCurrency(
                nightlyRate * getStayLength(currentCheckIn, extendCheckOut) * currentRooms,
                language,
                currency
              )}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          disabled={!extendHasValidRange || extendConflict != null || isBusy}
          onClick={onConfirm}
        >
          Confirm extension
        </Button>
      </DialogActions>
    </Dialog>
  )
}

