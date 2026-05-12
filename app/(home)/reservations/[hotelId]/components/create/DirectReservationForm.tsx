'use client'

import type { FormEventHandler } from 'react'
import { Stack } from '@mui/material'
import type { Control, FieldErrors, UseFormTrigger } from 'react-hook-form'
import { DirectReservationFormActions } from './DirectReservationFormActions'
import { DirectReservationStepContent } from './DirectReservationStepContent'
import { DirectReservationStepHeader } from './DirectReservationStepHeader'
import { useDirectReservationStepper } from '../../hooks/useDirectReservationStepper'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'
import type { RoomListItemResponse } from '@/app/(home)/agency/hotels/[hotelId]/rooms/configs/roomConfig'

interface DirectReservationFormProps {
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
  onSubmit: FormEventHandler<HTMLFormElement>
  trigger: UseFormTrigger<DirectReservationFormInput>
  isSubmitting?: boolean
  isLoading?: boolean
  rooms: RoomListItemResponse[]
  roomsLoading: boolean
  hasContract?: boolean
  hasInvoice?: boolean
  guestFullName?: string
  checkInDate?: string
  checkOutDate?: string
  roomNumbers?: string[]
  totalAmount?: number
  onBeforeNextStep?: (fromStep: number) => Promise<void>
}

export function DirectReservationForm({
  control,
  errors,
  onSubmit,
  trigger,
  isSubmitting = false,
  isLoading = false,
  rooms,
  roomsLoading,
  hasContract = false,
  hasInvoice = false,
  guestFullName,
  checkInDate,
  checkOutDate,
  roomNumbers,
  totalAmount,
  onBeforeNextStep,
}: DirectReservationFormProps) {
  const {
    activeStep,
    currentStep,
    handleBackStep,
    handleFormSubmit,
    handleNextStep,
    isFirstStep,
    isLastStep,
    isTransitioning,
    steps,
  } = useDirectReservationStepper({
    onSubmit,
    trigger,
    onBeforeNextStep,
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
          rooms={rooms}
          roomsLoading={roomsLoading}
          hasContract={hasContract}
          hasInvoice={hasInvoice}
          guestFullName={guestFullName}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          roomNumbers={roomNumbers}
          totalAmount={totalAmount}
        />

        <DirectReservationFormActions
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          isLoading={isLoading || isTransitioning}
          onBack={handleBackStep}
          onNext={handleNextStep}
        />
      </Stack>
    </form>
  )
}
