'use client'

import { useState, type FormEventHandler } from 'react'
import type { UseFormTrigger } from 'react-hook-form'
import { DIRECT_RESERVATION_STEPS } from '../constants/directReservationSteps'
import type { DirectReservationFormInput } from '../schema/directReservationSchema'

interface UseDirectReservationStepperOptions {
  onSubmit: FormEventHandler<HTMLFormElement>
  trigger: UseFormTrigger<DirectReservationFormInput>
  onBeforeNextStep?: (fromStep: number) => Promise<void>
}

export function useDirectReservationStepper({
  onSubmit,
  trigger,
  onBeforeNextStep,
}: UseDirectReservationStepperOptions) {
  const [activeStep, setActiveStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentStep = DIRECT_RESERVATION_STEPS[activeStep]
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === DIRECT_RESERVATION_STEPS.length - 1

  const handleNextStep = async () => {
    const isStepValid = await trigger(currentStep.fields, { shouldFocus: true })

    if (!isStepValid) {
      return
    }

    if (onBeforeNextStep) {
      setIsTransitioning(true)
      try {
        await onBeforeNextStep(activeStep)
      } finally {
        setIsTransitioning(false)
      }
    }

    setActiveStep(previousStep => Math.min(previousStep + 1, DIRECT_RESERVATION_STEPS.length - 1))
  }

  const handleBackStep = () => {
    setActiveStep(previousStep => Math.max(previousStep - 1, 0))
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = event => {
    if (!isLastStep) {
      event.preventDefault()
      void handleNextStep()
      return
    }

    onSubmit(event)
  }

  return {
    activeStep,
    currentStep,
    handleBackStep,
    handleFormSubmit,
    handleNextStep,
    isFirstStep,
    isLastStep,
    isTransitioning,
    steps: DIRECT_RESERVATION_STEPS,
  }
}
