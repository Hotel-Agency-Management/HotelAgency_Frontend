'use client'

import type { FormEventHandler } from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import type { Control, FieldErrors } from 'react-hook-form'
import { AdditionalSection } from './AdditionalSection'
import { GuestInformationSection } from './GuestInformationSection'
import { PaymentSection } from './PaymentSection'
import { ReservationDetailsSection } from './ReservationDetailsSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface DirectReservationFormProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
  onSubmit: FormEventHandler<HTMLFormElement>
  isSubmitting?: boolean
}

export function DirectReservationForm({
  control,
  errors,
  onSubmit,
  isSubmitting = false,
}: DirectReservationFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack spacing={3.5}>
        <GuestInformationSection control={control} errors={errors} />
        <ReservationDetailsSection control={control} errors={errors} />
        <PaymentSection control={control} errors={errors} />
        <AdditionalSection control={control} errors={errors} />

        <Paper
          variant='card'>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ md: 'center' }}
            justifyContent='space-between'
          >
            <Stack spacing={0.5}>
              <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                Finalize this reservation
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Review the reservation details and confirm it in one step.
              </Typography>
            </Stack>

            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              size='small'
            >
              Create Reservation
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </form>
  )
}
