'use client'

import { Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import type { DirectReservationStep } from '../../constants/directReservationSteps'

interface DirectReservationStepHeaderProps {
  activeStep: number
  currentStep: DirectReservationStep
  steps: DirectReservationStep[]
}

export function DirectReservationStepHeader({
  activeStep,
  currentStep,
  steps,
}: DirectReservationStepHeaderProps) {
  return (
    <Paper variant='card'>
      <Stack spacing={2.5}>
        <Stack spacing={0.75}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            Reservation setup
          </Typography>
          <Typography variant='body2'>
            Complete this reservation step by step instead of filling the whole form at once.
          </Typography>
        </Stack>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(step => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack spacing={0.5}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            Step {activeStep + 1} of {steps.length}
          </Typography>
          <Typography variant='body2'>
            {currentStep.description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
