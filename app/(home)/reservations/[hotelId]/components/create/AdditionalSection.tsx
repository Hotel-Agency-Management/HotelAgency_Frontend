import { Controller, type Control } from 'react-hook-form'
import { Box, Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormSection } from './FormSection'
import { SignaturePadField } from '@/components/common/SignaturePadField'
import {
  RESERVATION_SOURCE_OPTIONS,
  type DirectReservationFormInput,
} from '../../schema/directReservationSchema'

interface AdditionalSectionProps {
  control: Control<DirectReservationFormInput>
}

export function AdditionalSection({ control }: AdditionalSectionProps) {
  return (
    <FormSection
      title='Additional'
      description='Keep reservation context, guest requests, and internal notes in one place.'
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name='specialRequests'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Special Requests'
                fullWidth
                size='small'
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name='source'
            control={control}
            render={({ field, fieldState, formState }) => {
              const showError =
                !!fieldState.error && (fieldState.isTouched || fieldState.isDirty || formState.isSubmitted)

              return (
                <FormControl fullWidth error={showError} size='small'>
                  <InputLabel shrink id='reservation-source-label'>
                    Reservation Source
                  </InputLabel>
                  <Select
                    {...field}
                    displayEmpty
                    labelId='reservation-source-label'
                    label='Reservation Source'
                    value={field.value}
                    renderValue={selected =>
                      selected ? (
                        selected
                      ) : (
                        <Box component='span'>
                          Select reservation source
                        </Box>
                      )
                    }
                  >
                    <MenuItem disabled value=''>
                      Select reservation source
                    </MenuItem>
                    {RESERVATION_SOURCE_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{showError ? fieldState.error?.message : ' '}</FormHelperText>
                </FormControl>
              )
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Notes'
                fullWidth
                size='small'
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name='employeeSignatureDataUrl'
            control={control}
            render={({ field }) => (
              <SignaturePadField
                value={field.value}
                onChange={field.onChange}
                title='Employee Signature'
                description='Sign to confirm this reservation on behalf of the hotel.'
              />
            )}
          />
        </Grid>
      </Grid>
    </FormSection>
  )
}
