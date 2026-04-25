'use client'

import { type FormEventHandler } from 'react'
import { Stack } from '@mui/material'
import type { Control, FieldErrors, UseFormTrigger } from 'react-hook-form'
import { DirectReservationFormActions } from './DirectReservationFormActions'
import { DirectReservationStepContent } from './DirectReservationStepContent'
import { DirectReservationStepHeader } from './DirectReservationStepHeader'
import { useDirectReservationStepper } from '../../hooks/useDirectReservationStepper'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface DirectReservationFormProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
  onSubmit: FormEventHandler<HTMLFormElement>
  trigger: UseFormTrigger<DirectReservationFormInput>
  isSubmitting?: boolean
}

export function DirectReservationForm({
  control,
  errors,
  onSubmit,
  trigger,
  isSubmitting = false,
}: DirectReservationFormProps) {
  const {
    activeStep,
    currentStep,
    handleBackStep,
    handleFormSubmit,
    handleNextStep,
    isFirstStep,
    isLastStep,
    steps,
  } = useDirectReservationStepper({
    onSubmit,
    trigger,
  })

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <Stack spacing={3.5}>
        <DirectReservationStepHeader
          activeStep={activeStep}
          currentStep={currentStep}
          steps={steps}
        />

        <DirectReservationStepContent
          activeStep={activeStep}
          control={control}
          errors={errors}
        />

        <DirectReservationFormActions
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          onBack={handleBackStep}
          onNext={handleNextStep}
        />
      </Stack>
    </form>
  )
}
