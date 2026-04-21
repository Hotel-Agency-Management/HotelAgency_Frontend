import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Box, Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { FormSection } from './FormSection'
import {
  RESERVATION_SOURCES,
  type DirectReservationFormInput,
} from '../../schema/directReservationSchema'

interface AdditionalSectionProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function AdditionalSection({ control, errors }: AdditionalSectionProps) {
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
            name='reservationSource'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.reservationSource} size='small'>
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
                <FormHelperText>{errors.reservationSource?.message}</FormHelperText>
              </FormControl>
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
