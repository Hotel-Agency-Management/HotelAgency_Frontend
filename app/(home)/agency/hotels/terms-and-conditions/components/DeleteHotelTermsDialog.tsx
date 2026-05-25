import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useTranslation } from 'react-i18next'

interface DeleteHotelTermsDialogProps {
  open: boolean
  hotelName: string
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteHotelTermsDialog({
  open,
  hotelName,
  isDeleting,
  onClose,
  onConfirm
}: DeleteHotelTermsDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth='xs' fullWidth>
      <DialogTitle>{t('terms.deleteDialog.title', { defaultValue: 'Delete Terms & Conditions' })}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('terms.deleteDialog.confirmation', {
            defaultValue:
              'Are you sure you want to delete the Terms & Conditions for {{hotelName}}? This action cannot be undone.',
            hotelName
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isDeleting}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          variant='contained'
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={14} color='inherit' /> : undefined}
        >
          {isDeleting
            ? t('terms.deleteDialog.deleting', { defaultValue: 'Deleting...' })
            : t('terms.deleteDialog.delete', { defaultValue: 'Delete' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
