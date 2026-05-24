'use client'

import { Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <Paper variant='card'>
      <Stack spacing={2.5}>
        <Stack spacing={0.75}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            {t('reservations.stepper.setup', 'Reservation setup')}
          </Typography>
          <Typography variant='body2'>
            {t('reservations.stepper.setupDescription', 'Complete this reservation step by step instead of filling the whole form at once.')}
          </Typography>
        </Stack>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepLabelKeys: Record<number, string> = {
              0: 'reservations.stepper.steps.guest',
              1: 'reservations.stepper.steps.stay',
              2: 'reservations.stepper.steps.payment',
              3: 'reservations.stepper.steps.reservation',
              4: 'reservations.stepper.steps.confirm',
            }
            const stepLabel = t(stepLabelKeys[index] ?? '', step.label)
            return (
              <Step key={step.label}>
                <StepLabel>{stepLabel}</StepLabel>
              </Step>
            )
          })}
        </Stepper>

        <Stack spacing={0.5}>
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            {t('reservations.stepper.stepOf', 'Step {{current}} of {{total}}', { current: activeStep + 1, total: steps.length })}
          </Typography>
          <Typography variant='body2'>
            {currentStep.description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
