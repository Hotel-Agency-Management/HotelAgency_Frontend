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
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>{t('roomTypes.deleteDialog.title', { defaultValue: 'Delete Room Type' })}</DialogTitle>

      <DialogContent>
        <Typography variant='body2'>
          {t('roomTypes.deleteDialog.confirm', { defaultValue: 'Are you sure you want to delete' })}{' '}
          <Typography component='span' variant='body2' fontWeight={500} color='text.primary'>
            {roomType?.name}
          </Typography>
          ? {t('roomTypes.deleteDialog.cannotUndo', { defaultValue: 'This action cannot be undone.' })}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isLoading}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <LoadingButton
          onClick={onConfirm}
          variant='contained'
          color='error'
          loading={isLoading}
          loadingPosition='start'
          startIcon={<DeleteIcon />}
        >
          {t('roomTypes.delete', { defaultValue: 'Delete Room Type' })}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
