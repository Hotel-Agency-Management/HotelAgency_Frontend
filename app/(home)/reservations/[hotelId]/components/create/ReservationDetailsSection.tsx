import dayjs from 'dayjs'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Box, Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import { FormSection } from './FormSection'
import {
  ROOM_TYPE_OPTIONS,
  type DirectReservationFormInput,
} from '../../schema/directReservationSchema'

interface ReservationDetailsSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function ReservationDetailsSection({
  control,
  errors,
}: ReservationDetailsSectionProps) {
  return (
    <FormSection
      title='Reservation Details'
      description='Confirm the stay window, occupancy, and room category for this reservation.'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='checkInDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Check-in Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={value => field.onChange(value && value.isValid() ? value.format('YYYY-MM-DD') : '')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      error: !!errors.checkInDate,
                      helperText: errors.checkInDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='checkOutDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Check-out Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={value => field.onChange(value && value.isValid() ? value.format('YYYY-MM-DD') : '')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      error: !!errors.checkOutDate,
                      helperText: errors.checkOutDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='numberOfGuests'
              control={control}
              render={({ field }) => (
                <TextField
                  label='Number of Guests'
                  type='number'
                  fullWidth
                  size='small'
                  value={field.value}
                  error={!!errors.numberOfGuests}
                  helperText={errors.numberOfGuests?.message}
                  onChange={event =>
                    field.onChange(event.target.value === '' ? '' : Number(event.target.value))
                  }
                  inputProps={{ min: 1 }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='numberOfRooms'
              control={control}
              render={({ field }) => (
                <TextField
                  label='Number of Rooms'
                  type='number'
                  fullWidth
                  size='small'
                  value={field.value}
                  error={!!errors.numberOfRooms}
                  helperText={errors.numberOfRooms?.message}
                  onChange={event =>
                    field.onChange(event.target.value === '' ? '' : Number(event.target.value))
                  }
                  inputProps={{ min: 1 }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name='roomType'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.roomType} size='small'>
                  <InputLabel shrink id='front-desk-room-type-label'>
                    Room Type
                  </InputLabel>
                  <Select
                    {...field}
                    displayEmpty
                    labelId='front-desk-room-type-label'
                    label='Room Type'
                    value={field.value}
                    renderValue={selected =>
                      selected ? (
                        ROOM_TYPES[selected as keyof typeof ROOM_TYPES].label
                      ) : (
                        <Box component='span'>
                          Select room type
                        </Box>
                      )
                    }
                  >
                    <MenuItem disabled value=''>
                      Select room type
                    </MenuItem>
                    {ROOM_TYPE_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {ROOM_TYPES[option.value].label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.roomType?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </FormSection>
  )
}
