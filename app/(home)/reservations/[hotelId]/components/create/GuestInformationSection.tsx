import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { FormSection } from './FormSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface GuestInformationSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function GuestInformationSection({
  control,
  errors,
}: GuestInformationSectionProps) {
  return (
    <FormSection
      title='Guest Information'
      description='Store the guest identity exactly as it should appear on the reservation and check-in records.'
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='guestFullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Full Name'
                fullWidth
                size='small'
                error={!!errors.guestFullName}
                helperText={errors.guestFullName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='guestPhone'
            control={control}
            render={({ field }) => (
              <MuiTelInput
                {...field}
                fullWidth
                size='small'
                label='Phone Number'
                defaultCountry='PS'
                error={!!errors.guestPhone}
                helperText={errors.guestPhone?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='guestEmail'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                type='email'
                fullWidth
                size='small'
                error={!!errors.guestEmail}
                helperText={errors.guestEmail?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='guestIdNumber'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='ID / Passport Number'
                fullWidth
                size='small'
                error={!!errors.guestIdNumber}
                helperText={errors.guestIdNumber?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormSection>
  )
}
