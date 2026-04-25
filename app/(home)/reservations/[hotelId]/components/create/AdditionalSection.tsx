import { Controller, type Control } from 'react-hook-form'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { SignaturePadField } from '@/components/common/SignaturePadField'
import { FormSection } from './FormSection'
import {
  RESERVATION_SOURCES,
  type DirectReservationFormInput,
} from '../../schema/directReservationSchema'

interface AdditionalSectionProps {
  control: Control<DirectReservationFormInput>
}

export function AdditionalSection({ control }: AdditionalSectionProps) {
  const theme = useTheme()

  return (
    <FormSection
      title='Additional'
      description='Keep reservation context, guest requests, employee signature, and internal notes in one place.'
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
            name='reservationSource'
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
                    {RESERVATION_SOURCES.map(source => (
                      <MenuItem key={source} value={source}>
                        {source}
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
            name='signatureDataUrl'
            control={control}
            render={({ field, fieldState, formState }) => (
              <SignaturePadField
                value={field.value}
                onChange={field.onChange}
                title='Employee Signature'
                description='Sign once to confirm the reservation before final submission.'
                penColor={theme.palette.common.black}
                backgroundColor={alpha(theme.palette.common.white, 0.96)}
                error={
                  fieldState.error && (fieldState.isTouched || fieldState.isDirty || formState.isSubmitted)
                    ? fieldState.error.message
                    : undefined
                }
              />
            )}
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
      </Grid>
    </FormSection>
  )
}
