'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

interface GuestLoginPromptDialogProps {
  open: boolean
  onClose: () => void
}

export function GuestLoginPromptDialog({ open, onClose }: GuestLoginPromptDialogProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogin = () => {
    onClose()
    router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign in to book your room</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          You need an account to complete your reservation. Log in or create a free account to continue.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleLogin} variant="contained">
          Log in / Sign up
        </Button>
      </DialogActions>
    </Dialog>
  )
}
