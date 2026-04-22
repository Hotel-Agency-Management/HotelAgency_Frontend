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
            name='fullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Full Name'
                fullWidth
                size='small'
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <MuiTelInput
                {...field}
                fullWidth
                size='small'
                label='Phone Number'
                defaultCountry='PS'
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                type='email'
                fullWidth
                size='small'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='idOrPassportNumber'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='ID / Passport Number'
                fullWidth
                size='small'
                error={!!errors.idOrPassportNumber}
                helperText={errors.idOrPassportNumber?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormSection>
  )
}
