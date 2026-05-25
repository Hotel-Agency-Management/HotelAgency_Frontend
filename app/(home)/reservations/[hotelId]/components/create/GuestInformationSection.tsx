import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { useTranslation } from 'react-i18next'
import { FormSection } from './FormSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface GuestInformationSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function GuestInformationSection({ control, errors }: GuestInformationSectionProps) {
  const { t } = useTranslation()

  return (
    <FormSection
      title={t('reservations.form.guest.title', { defaultValue: 'Guest Information' })}
      description={t('reservations.form.guest.description', {
        defaultValue: 'Store the guest identity exactly as it should appear on the reservation and check-in records.'
      })}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='guestFullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('reservations.form.guest.fullName', { defaultValue: 'Full Name' })}
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
                label={t('reservations.form.guest.phoneNumber', { defaultValue: 'Phone Number' })}
                defaultCountry='PS'
                error={!!errors.guestPhone}
                helperText={errors.guestPhone?.message}
                slotProps={{ htmlInput: { dir: 'ltr', style: { direction: 'ltr', textAlign: 'left' } } }}
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
                label={t('reservations.form.guest.email', { defaultValue: 'Email' })}
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
                label={t('reservations.form.guest.idPassport', { defaultValue: 'ID / Passport Number' })}
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
