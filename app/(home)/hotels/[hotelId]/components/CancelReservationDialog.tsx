'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'

interface CancelReservationDialogProps {
  open: boolean
  freeCancellation: boolean
  freeCancellationDeadlineLabel: string
  reservationTotalLabel: string
  cancellationFeeRateLabel: string
  cancellationFeeLabel: string
  refundAmountLabel: string
  isBusy: boolean
  onClose: () => void
  onConfirm: () => void
}

export function CancelReservationDialog({
  open,
  freeCancellation,
  freeCancellationDeadlineLabel,
  reservationTotalLabel,
  cancellationFeeRateLabel,
  cancellationFeeLabel,
  refundAmountLabel,
  isBusy,
  onClose,
  onConfirm,
}: CancelReservationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cancel reservation</DialogTitle>
      <DialogContent>
        <Stack spacing={2} >
          <Alert severity={freeCancellation ? 'success' : 'warning'}>
            {freeCancellation
              ? 'Cancellation is free until the last 3 days before check-in.'
              : `Cancelling within the last 3 days before check-in applies a ${cancellationFeeRateLabel} fee of ${cancellationFeeLabel}.`}
          </Alert>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Fee starts on
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {freeCancellationDeadlineLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Reservation total
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {reservationTotalLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Cancellation fee ({cancellationFeeRateLabel})
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {cancellationFeeLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2">
              Refund amount
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {refundAmountLabel}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Keep reservation
        </Button>
        <Button color="error" variant="contained" disabled={isBusy} onClick={onConfirm}>
          Confirm cancellation
        </Button>
      </DialogActions>
    </Dialog>
  )
}

