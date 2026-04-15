import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { RoomTypeForm } from './RoomTypeForm'
import { RoomTypeFormValues } from '../../schema/roomTypeSchema'
import { RoomType } from '../../types/roomType'
import { FORM_ID } from '../../constants/form'

interface RoomTypeFormDialogProps {
  currency: string
  open: boolean
  editingRoomType?: RoomType | null
  onClose: () => void
  onSubmit: (values: RoomTypeFormValues) => void
}

export function RoomTypeFormDialog({
  currency,
  open,
  editingRoomType,
  onClose,
  onSubmit,
}: RoomTypeFormDialogProps) {
  const isEditing = !!editingRoomType

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEditing ? 'Edit room type' : 'Add room type'}
        <IconButton onClick={onClose} size='small'>
          <CloseIcon fontSize='small' />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <RoomTypeForm
          formId={FORM_ID}
          defaultValues={editingRoomType ?? undefined}
          onSubmit={onSubmit}
          currency={currency}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='inherit'>
          Cancel
        </Button>
        <Button type='submit' form={FORM_ID} variant='contained' size='small'>
          {isEditing ? 'Save changes' : 'Add room type'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
