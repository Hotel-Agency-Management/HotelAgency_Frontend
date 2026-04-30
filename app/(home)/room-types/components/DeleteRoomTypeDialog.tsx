import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { RoomType } from '../types/roomType'

interface DeleteRoomTypeDialogProps {
  open: boolean
  roomType?: RoomType | null
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteRoomTypeDialog({
  open,
  roomType,
  isLoading = false,
  onClose,
  onConfirm,
}: DeleteRoomTypeDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>Delete room type</DialogTitle>

      <DialogContent>
        <Typography variant='body2'>
          Are you sure you want to delete{' '}
          <Typography component='span' variant='body2' fontWeight={500} color='text.primary'>
            {roomType?.name}
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isLoading}>
          Cancel
        </Button>
        <LoadingButton
          onClick={onConfirm}
          variant='contained'
          color='error'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<DeleteIcon />}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
