import type { ConfirmationStepStrategy } from '../types'
import { ReviewConfirmStep } from '../ReviewConfirmStep'

export const createReviewConfirmStepStrategy = (): ConfirmationStepStrategy => ({
  render: ({ modalState, reservation }) => (
    <ReviewConfirmStep
      bookingDetails={modalState.bookingDetails}
      reservation={reservation}
      roomTypeLabel={modalState.roomTypeLabel}
      signatureDataUrl={modalState.signatureDataUrl}
      termsAccepted={modalState.termsAccepted}
      totalPriceLabel={modalState.totalPriceLabel}
    />
  ),
})
