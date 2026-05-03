'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { DatePickerField } from '@/components/common/DatePickerField'
import { getStayLength, formatCurrency } from '../utils/roomBooking'

interface ExtendReservationDialogProps {
  open: boolean
  currentCheckOut: string
  extendPrice: number
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
  extendPrice,
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
  const extraNights = getStayLength(currentCheckOut, extendCheckOut)
  const extensionTotal = extraNights * extendPrice

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

          <Stack spacing={0.75}>
            <Typography variant="body2" color="text.secondary">
              Extra nights:{' '}
              <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
                {extraNights}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Extension price:{' '}
              <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
                {formatCurrency(extendPrice, language, currency)}
              </Typography>
            </Typography>
          </Stack>

          <Typography variant="body2">
            Extension total:{' '}
            <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
              {formatCurrency(extensionTotal, language, currency)}
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

