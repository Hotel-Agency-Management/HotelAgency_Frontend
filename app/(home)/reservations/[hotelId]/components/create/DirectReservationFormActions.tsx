'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'

interface DirectReservationFormActionsProps {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting: boolean
  onBack: () => void
  onNext: () => void
}

export function DirectReservationFormActions({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
  onNext,
}: DirectReservationFormActionsProps) {
  return (
    <Paper variant='card'>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ md: 'center' }}
        justifyContent='space-between'
      >
        <Stack spacing={0.5}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {isLastStep ? 'Finalize this reservation' : 'Continue to the next step'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {isLastStep
              ? 'Review the reservation details and confirm it in the final step.'
              : 'Save the current section validation before moving forward.'}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1.5} justifyContent='flex-end'>
          <Button
            type='button'
            variant='outlined'
            disabled={isFirstStep || isSubmitting}
            size='small'
            onClick={onBack}
          >
            Back
          </Button>
          {isLastStep ? (
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting}
              size='small'
            >
              Create Reservation
            </Button>
          ) : (
            <Button
              type='button'
              variant='contained'
              disabled={isSubmitting}
              size='small'
              onClick={() => void onNext()}
            >
              Next
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}
