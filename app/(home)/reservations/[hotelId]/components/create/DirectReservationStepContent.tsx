'use client'

import type { Control, FieldErrors } from 'react-hook-form'
import { AdditionalSection } from './AdditionalSection'
import { GuestInformationSection } from './GuestInformationSection'
import { PaymentSection } from './PaymentSection'
import { ReservationDetailsSection } from './ReservationDetailsSection'
import type { DirectReservationFormInput } from '../../schema/directReservationSchema'

interface DirectReservationStepContentProps {
  activeStep: number
  control: Control<DirectReservationFormInput>
  errors: FieldErrors<DirectReservationFormInput>
}

export function DirectReservationStepContent({
  activeStep,
  control,
  errors,
}: DirectReservationStepContentProps) {
  switch (activeStep) {
    case 0:
      return <GuestInformationSection control={control} errors={errors} />
    case 1:
      return <ReservationDetailsSection control={control} errors={errors} />
    case 2:
      return <PaymentSection control={control} errors={errors} />
    case 3:
    default:
      return <AdditionalSection control={control} />
  }
}
