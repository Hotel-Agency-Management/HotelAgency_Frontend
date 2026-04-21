'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'

interface CancelReservationDialogProps {
  open: boolean
  freeCancellation: boolean
  freeCancellationDeadlineLabel: string
  cancellationFeeLabel: string
  isBusy: boolean
  onClose: () => void
  onConfirm: () => void
}

export function CancelReservationDialog({
  open,
  freeCancellation,
  freeCancellationDeadlineLabel,
  cancellationFeeLabel,
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
              ? 'Cancellation is still free during the first 6 hours.'
              : `Cancelling now applies a fee of ${cancellationFeeLabel}.`}
          </Alert>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Free cancellation until
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {freeCancellationDeadlineLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Cancellation fee
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {cancellationFeeLabel}
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

