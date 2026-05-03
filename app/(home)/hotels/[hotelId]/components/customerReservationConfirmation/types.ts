import type { ReactNode } from 'react'
import type { ReservationDetails } from '../../types/customerReservationConfirmation'
import type { useCustomerReservationConfirmationModal } from '../../hooks/useCustomerReservationConfirmationModal'

export type ConfirmationModalState = ReturnType<typeof useCustomerReservationConfirmationModal>

export interface ConfirmationStepStrategyContext {
  modalState: ConfirmationModalState
  reservation: ReservationDetails
}

export interface ConfirmationStepValidationContext {
  signatureDataUrl: string
  termsAccepted: boolean
}

export interface ConfirmationStepStrategy {
  render: (context: ConfirmationStepStrategyContext) => ReactNode
  validate?: (context: ConfirmationStepValidationContext) => string | null
}
