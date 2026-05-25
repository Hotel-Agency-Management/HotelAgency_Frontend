import { useEffect, useMemo } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { defaultRoomAmenityFormValues } from '../../constants/roomAmenityFormValues'
import {
  createRoomAmenitySchema,
  type RoomAmenityFormValues,
} from '../../schema/roomAmenitySchema'

interface Props {
  open: boolean
  isSaving: boolean
  onClose: () => void
  onSaveDetails: (values: RoomAmenityFormValues) => Promise<void>
}

export function RoomAmenityFormDialog({ open, isSaving, onClose, onSaveDetails }: Props) {
  const { t } = useTranslation()
  const schema = useMemo(() => createRoomAmenitySchema(t), [t])
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomAmenityFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultRoomAmenityFormValues,
  })

  useEffect(() => {
    if (!open) return
    reset(defaultRoomAmenityFormValues)
  }, [open, reset])

  const handleClose = () => {
    if (isSaving) return
    onClose()
  }

  const handleSave = handleSubmit(async (values) => {
    await onSaveDetails(values)
    onClose()
  })

  return (
    <Dialog open={open} onClose={isSaving ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('roomAmenities.createDialog.title', { defaultValue: 'Create Room Amenity' })}</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label={t('roomAmenities.form.name', { defaultValue: 'Amenity Name' })}
            placeholder={t('roomAmenities.form.namePlaceholder', { defaultValue: 'Enter amenity name' })}
            fullWidth
            size="small"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isSaving}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button
          type="button"
          variant="contained"
          disabled={isSaving}
          onClick={handleSave}
          startIcon={isSaving ? <CircularProgress size={16} /> : null}
        >
          {t('roomAmenities.save', { defaultValue: 'Save' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
