'use client'

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material'
import { FileText, ReceiptText, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ReservationCreatedDialogProps {
  open: boolean
  contractUrl?: string | null
  invoiceUrl?: string | null
  onClose: () => void
}

export function ReservationCreatedDialog({ open, contractUrl, invoiceUrl, onClose }: ReservationCreatedDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6'>
            {t('hotelPortal.booking.reservationCreated', { defaultValue: 'Reservation created' })}
          </Typography>
          <IconButton
            aria-label={t('hotelPortal.booking.closeDialog', { defaultValue: 'Close dialog' })}
            onClick={onClose}
            size='small'
          >
            <X size={18} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant='body2' color='text.secondary'>
            {t('hotelPortal.booking.reservationConfirmed', {
              defaultValue: 'Your reservation is confirmed. You can reopen the contract and invoice from here.'
            })}
          </Typography>

          <Stack spacing={1.25}>
            <Button
              fullWidth
              variant='outlined'
              size='small'
              component='a'
              href={contractUrl ?? '#'}
              target='_blank'
              rel='noopener noreferrer'
              startIcon={<FileText size={16} />}
              disabled={!contractUrl}
            >
              {t('hotelPortal.booking.viewContract', { defaultValue: 'View contract' })}
            </Button>
            <Button
              fullWidth
              variant='contained'
              size='small'
              component='a'
              href={invoiceUrl ?? '#'}
              target='_blank'
              rel='noopener noreferrer'
              startIcon={<ReceiptText size={16} />}
              disabled={!invoiceUrl}
            >
              {t('hotelPortal.booking.viewInvoice', { defaultValue: 'View invoice' })}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
