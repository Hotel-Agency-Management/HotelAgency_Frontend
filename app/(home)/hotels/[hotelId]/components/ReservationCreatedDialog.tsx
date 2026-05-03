'use client'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { FileText, ReceiptText, X } from 'lucide-react'

interface ReservationCreatedDialogProps {
  open: boolean
  openingContract?: boolean
  openingInvoice?: boolean
  onClose: () => void
  onOpenContract: () => void
  onOpenInvoice: () => void
}

export function ReservationCreatedDialog({
  open,
  openingContract = false,
  openingInvoice = false,
  onClose,
  onOpenContract,
  onOpenInvoice,
}: ReservationCreatedDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Reservation created</Typography>
          <IconButton aria-label="Close dialog" onClick={onClose} size="small">
            <X size={18} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Your reservation is confirmed. Open the contract and invoice from the actions below.
          </Typography>

          <Stack spacing={1.25}>
            <Button
              fullWidth
              variant="outlined"
              size='small'
              startIcon={<FileText size={16} />}
              disabled={openingContract}
              onClick={onOpenContract}

            >
              Open contract
            </Button>
            <Button
              fullWidth
              size='small'
              variant="contained"
              startIcon={<ReceiptText size={16} />}
              disabled={openingInvoice}
              onClick={onOpenInvoice}
            >
              Open invoice
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
