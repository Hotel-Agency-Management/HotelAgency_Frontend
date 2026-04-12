'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

interface EmailVerificationDialogProps {
  email: string
  open: boolean
  isLoading: boolean
  errorMessage: string
  successMessage: string
  onClose: () => void
  onResend: () => void
}

const EmailVerificationDialog: React.FC<EmailVerificationDialogProps> = ({
  email,
  open,
  isLoading,
  errorMessage,
  successMessage,
  onClose,
  onResend
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
    <DialogTitle>Email Verification</DialogTitle>
    <DialogContent>
      <Stack spacing={2}>
        <Typography variant='body2'>
          This email is not verified yet.
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          {email}
        </Typography>
        <Typography variant='body2'>
          Send a new verification email?
        </Typography>

        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      </Stack>
    </DialogContent>

    <DialogActions disableSpacing>
      <Stack direction='row' gap={1} width='100%' justifyContent='flex-end'>
        <Button onClick={onClose} disabled={isLoading} size='small'>
          Cancel
        </Button>
        <LoadingButton onClick={onResend} loading={isLoading} variant='contained' size='small' sx={{ minWidth: 124 }}>
          Resend Email
        </LoadingButton>
      </Stack>
    </DialogActions>
  </Dialog>
)

export default EmailVerificationDialog
