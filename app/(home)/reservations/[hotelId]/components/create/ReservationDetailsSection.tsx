import dayjs from 'dayjs'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Autocomplete, Grid, ListItem, ListItemText, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { FormSection } from './FormSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'
import type { RoomListItemResponse } from '@/app/(home)/agency/hotels/[hotelId]/rooms/configs/roomConfig'

interface ReservationDetailsSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
  rooms: RoomListItemResponse[]
  roomsLoading: boolean
}

export function ReservationDetailsSection({
  control,
  errors,
  rooms,
  roomsLoading,
}: ReservationDetailsSectionProps) {
  return (
    <FormSection
      title='Reservation Details'
      description='Confirm the stay window, occupancy, and assigned room numbers for this reservation.'
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
              name='roomNumbers'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  size='small'
                  loading={roomsLoading}
                  options={rooms}
                  getOptionLabel={option => option.roomNumber}
                  isOptionEqualToValue={(option, value) => option.roomNumber === value.roomNumber}
                  value={rooms.filter(r => field.value.includes(r.roomNumber))}
                  onChange={(_event, selected) =>
                    field.onChange(selected.map(r => r.roomNumber))
                  }
                  renderOption={(props, option) => (
                    <ListItem {...props} key={option.roomId} component='li'>
                      <ListItemText
                        primary={`Room ${option.roomNumber}`}
                        secondary={`${option.roomType} · $${option.pricePerNight}/night`}
                      />
                    </ListItem>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Rooms'
                      error={!!errors.roomNumbers}
                      helperText={errors.roomNumbers?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </FormSection>
  )
}
