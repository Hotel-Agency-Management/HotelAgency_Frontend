import type { ConfirmationStepStrategy } from '../types'
import { BookingDetailsStep } from '../BookingDetailsStep'

export const createBookingDetailsStepStrategy = (): ConfirmationStepStrategy => ({
  render: ({ modalState }) => (
    <BookingDetailsStep
      bookingDetails={modalState.bookingDetails}
      pricePerNightLabel={modalState.pricePerNightLabel}
      totalPriceLabel={modalState.totalPriceLabel}
    />
  ),
})
