import {
  BOOKING_CONFIRMATION_STEP_IDS,
  type BookingConfirmationStepId,
} from '../../constants/customerReservationConfirmation'
import type { ConfirmationStepStrategy } from './types'
import { createBookingDetailsStepStrategy } from './strategies/bookingDetailsStrategy'
import { createContractPreviewStepStrategy } from './strategies/contractPreviewStrategy'
import { createReviewConfirmStepStrategy } from './strategies/reviewConfirmStrategy'
import { createSignatureStepStrategy } from './strategies/signatureStrategy'
import { createTermsStepStrategy } from './strategies/termsStrategy'

export const createConfirmationStepStrategy = (
  stepId: BookingConfirmationStepId
): ConfirmationStepStrategy => {
  switch (stepId) {
    case BOOKING_CONFIRMATION_STEP_IDS.BOOKING_DETAILS:
      return createBookingDetailsStepStrategy()

    case BOOKING_CONFIRMATION_STEP_IDS.TERMS:
      return createTermsStepStrategy()

    case BOOKING_CONFIRMATION_STEP_IDS.CONTRACT_PREVIEW:
      return createContractPreviewStepStrategy()

    case BOOKING_CONFIRMATION_STEP_IDS.SIGNATURE:
      return createSignatureStepStrategy()

    case BOOKING_CONFIRMATION_STEP_IDS.REVIEW_CONFIRM:
    default:
      return createReviewConfirmStepStrategy()
  }
}
