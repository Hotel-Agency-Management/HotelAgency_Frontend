import type { BookingConfirmationStepId } from '../../constants/customerReservationConfirmation'
import type { ReservationDetails } from '../../types/customerReservationConfirmation'
import { createConfirmationStepStrategy } from './factory'
import type { ConfirmationModalState } from './types'

interface ConfirmationStepContentProps {
  stepId: BookingConfirmationStepId
  modalState: ConfirmationModalState
  reservation: ReservationDetails
}

export function ConfirmationStepContent({
  stepId,
  modalState,
  reservation,
}: ConfirmationStepContentProps) {
  const strategy = createConfirmationStepStrategy(stepId)

  return strategy.render({ modalState, reservation })
}
