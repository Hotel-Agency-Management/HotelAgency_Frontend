import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Box, Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormSection } from './FormSection'
import {
  PAYMENT_METHODS,
  type DirectReservationFormInput,
} from '../../schema/directReservationSchema'

interface PaymentSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function PaymentSection({ control, errors }: PaymentSectionProps) {
  return (
    <FormSection
      title='Payment'
      description='Track payment method and current balance without leaving the reservation flow.'
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.paymentMethod} size='small'>
                <InputLabel shrink id='front-desk-payment-method-label'>
                  Payment Method
                </InputLabel>
                <Select
                  {...field}
                  displayEmpty
                  labelId='front-desk-payment-method-label'
                  label='Payment Method'
                  value={field.value}
                  renderValue={selected =>
                    selected ? (
                      selected
                    ) : (
                      <Box component='span'>
                        Select payment method
                      </Box>
                    )
                  }
                >
                  <MenuItem disabled value=''>
                    Select payment method
                  </MenuItem>
                  {PAYMENT_METHODS.map(method => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.paymentMethod?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='paidAmount'
            control={control}
            render={({ field }) => (
                <TextField
                  label='Paid Amount'
                  type='number'
                  fullWidth
                  size='small'
                  value={field.value}
                  error={!!errors.paidAmount}
                  helperText={errors.paidAmount?.message}
                  onChange={event =>
                    field.onChange(event.target.value === '' ? '' : Number(event.target.value))
                  }
                  inputProps={{ min: 0 }}
                />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='remainingAmount'
            control={control}
            render={({ field }) => (
              <TextField
                label='Remaining Amount'
                type='number'
                fullWidth
                size='small'
                value={field.value}
                InputProps={{ readOnly: true }}
              />
              )}
            />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name='totalAmount'
            control={control}
            render={({ field }) => (
              <TextField
                label='Total Amount'
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
