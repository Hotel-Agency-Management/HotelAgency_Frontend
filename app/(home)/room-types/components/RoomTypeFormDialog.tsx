import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import { RoomTypeForm } from './RoomTypeForm'
import { RoomTypeFormValues } from '../schema/roomTypeSchema'
import { RoomType } from '../types/roomType'
import { FORM_ID } from '../constants/form'
import { useTranslation } from 'react-i18next'

interface RoomTypeFormDialogProps {
  open: boolean
  editingRoomType?: RoomType | null
  isLoading?: boolean
  onClose: () => void
  onSubmit: (values: RoomTypeFormValues) => void
}

export function RoomTypeFormDialog({
  open,
  editingRoomType,
  isLoading = false,
  onClose,
  onSubmit,
}: RoomTypeFormDialogProps) {
  const { t } = useTranslation()
  const isEditing = !!editingRoomType

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            {isEditing
              ? t('roomTypes.edit', { defaultValue: 'Edit Room Type' })
              : t('roomTypes.create', { defaultValue: 'Add Room Type' })}
            <IconButton onClick={onClose} size='small' disabled={isLoading}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </Stack>
        </DialogTitle>
      <DialogContent>
        <RoomTypeForm
          formId={FORM_ID}
          defaultValues={editingRoomType ?? undefined}
          onSubmit={onSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit' disabled={isLoading}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <LoadingButton
          type='submit'
          form={FORM_ID}
          variant='contained'
          size='small'
          loading={isLoading}
          loadingPosition='start'
          startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
        >
          {isEditing
            ? t('roomTypes.saveChanges', { defaultValue: 'Save Changes' })
            : t('roomTypes.create', { defaultValue: 'Add Room Type' })}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
