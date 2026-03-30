import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import { SubscriptionPlan } from './types'
interface DeleteDialogProps {
  plan: SubscriptionPlan | null
  open: boolean
  loading: boolean
  onConfirm: () => Promise<void>
  onClose: () => void
}

export default function DeleteDialog({
  plan,
  open,
  loading,
  onConfirm,
  onClose,
}: DeleteDialogProps) {
  if (!plan) return null

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Delete Plan</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>
          Are you sure you want to delete the{' '}
          <strong>{plan.name}</strong> plan? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={onConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color='inherit' /> : undefined}
        >
          {loading ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
