import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormSection } from './FormSection'
import { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface PaymentSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function PaymentSection({ control }: PaymentSectionProps) {
  const { t } = useTranslation()

  return (
    <FormSection
      title={t('reservations.form.payment.title', { defaultValue: 'Payment' })}
      description={t('reservations.form.payment.description', {
        defaultValue: 'Track payment method and current balance without leaving the reservation flow.'
      })}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='totalAmount'
            control={control}
            render={({ field }) => (
              <TextField
                label={t('reservations.form.payment.totalAmount', { defaultValue: 'Total Amount' })}
                type='number'
                fullWidth
                size='small'
                value={field.value}
                InputProps={{ readOnly: true }}
              />
            )}
          />
        </Grid>
      </Grid>
    </FormSection>
  )
}
