import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import { RoomType } from '../types/roomType'

interface DeleteRoomTypeDialogProps {
  open: boolean
  roomType?: RoomType | null
  onClose: () => void
  onConfirm: () => void
}

export function DeleteRoomTypeDialog({
  open,
  roomType,
  onClose,
  onConfirm,
}: DeleteRoomTypeDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Delete room type</DialogTitle>

      <DialogContent>
        <Typography variant='body2' color='text.secondary'>
          Are you sure you want to delete{' '}
          <Typography component='span' variant='body2' fontWeight={500} color='text.primary'>
            {roomType?.name}
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
