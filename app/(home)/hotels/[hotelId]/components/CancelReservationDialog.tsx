'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('hotelPortal.booking.cancelReservation', 'Cancel reservation')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} >
          <Alert severity={freeCancellation ? 'success' : 'warning'}>
            {freeCancellation
              ? t('hotelPortal.booking.freeCancellationInfo', 'Cancellation is free until the last 3 days before check-in.')
              : t('hotelPortal.booking.cancellationFeeInfo', { rate: cancellationFeeRateLabel, fee: cancellationFeeLabel, defaultValue: 'Cancelling within the last 3 days before check-in applies a {{rate}} fee of {{fee}}.' })}
          </Alert>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {t('hotelPortal.booking.feeStartsOn', 'Fee starts on')}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {freeCancellationDeadlineLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {t('hotelPortal.booking.reservationTotal', 'Reservation total')}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {reservationTotalLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2" color="text.secondary">
              {t('hotelPortal.booking.cancellationFeeWithRate', { rate: cancellationFeeRateLabel, defaultValue: 'Cancellation fee ({{rate}})' })}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {cancellationFeeLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Typography variant="body2">
              {t('hotelPortal.booking.refundAmount', 'Refund amount')}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {refundAmountLabel}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {t('hotelPortal.booking.keepReservation', 'Keep reservation')}
        </Button>
        <Button color="error" variant="contained" disabled={isBusy} onClick={onConfirm}>
          {t('hotelPortal.booking.confirmCancellation', 'Confirm cancellation')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

