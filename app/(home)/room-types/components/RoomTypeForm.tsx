'use client'
import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, TextField } from '@mui/material'
import { RoomTypeFormValues, createRoomTypeSchema } from '../schema/roomTypeSchema'
import { RoomType } from '../types/roomType'
import { useTranslation } from 'react-i18next'

interface RoomTypeFormProps {
  formId: string
  defaultValues?: RoomType
  onSubmit: (values: RoomTypeFormValues) => void
}

export function RoomTypeForm({ formId, defaultValues, onSubmit }: RoomTypeFormProps) {
  const { t } = useTranslation()
  const schema = useMemo(() => createRoomTypeSchema(t), [t])
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomTypeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description,
      })
    }
  }, [defaultValues, reset])

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('roomTypes.form.name', { defaultValue: 'Name' })}
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('roomTypes.form.description', { defaultValue: 'Description' })}
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>

      </Grid>
    </form>
  )
}
