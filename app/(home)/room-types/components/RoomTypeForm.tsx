'use client'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { RoomTypeFormValues, roomTypeSchema } from '../schema/roomTypeSchema'
import { RoomType } from '../types/roomType'

interface RoomTypeFormProps {
  formId: string
  defaultValues?: RoomType
  onSubmit: (values: RoomTypeFormValues) => void
}

export function RoomTypeForm({ formId, defaultValues, onSubmit }: RoomTypeFormProps) {
  const currencySymbol = '$'
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomTypeFormValues>({
    resolver: zodResolver(roomTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: undefined,
      dailyPrice: undefined,
      weeklyPrice: undefined,
      monthlyPrice: undefined,
      extendPrice: undefined,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name,
        description: defaultValues.description,
        capacity: defaultValues.capacity,
        dailyPrice: defaultValues.dailyPrice,
        weeklyPrice: defaultValues.weeklyPrice,
        monthlyPrice: defaultValues.monthlyPrice,
        extendPrice: defaultValues.extendPrice,
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
                label='Name'
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
                label='Description'
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='capacity'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Capacity'
                type='number'
                fullWidth
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='dailyPrice'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Daily price'
                type='number'
                fullWidth
                error={!!errors.dailyPrice}
                helperText={errors.dailyPrice?.message}
                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>{currencySymbol}</InputAdornment>,
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='weeklyPrice'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Weekly price'
                type='number'
                fullWidth
                error={!!errors.weeklyPrice}
                helperText={errors.weeklyPrice?.message}
                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>{currencySymbol}</InputAdornment>,
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='monthlyPrice'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Monthly price'
                type='number'
                fullWidth
                error={!!errors.monthlyPrice}
                helperText={errors.monthlyPrice?.message}
                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>{currencySymbol}</InputAdornment>,
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name='extendPrice'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Extension price'
                type='number'
                fullWidth
                error={!!errors.extendPrice}
                helperText={errors.extendPrice?.message}
                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>{currencySymbol}</InputAdornment>,
                }}
              />
            )}
          />
        </Grid>

      </Grid>
    </form>
  )
}
