import type { ConfirmationStepStrategy } from '../types'
import { BookingDetailsStep } from '../BookingDetailsStep'

export const createBookingDetailsStepStrategy = (): ConfirmationStepStrategy => ({
  render: ({ modalState }) => (
    <BookingDetailsStep
      bookingDetails={modalState.bookingDetails}
      pricePerNightLabel={modalState.pricePerNightLabel}
      totalPriceLabel={modalState.totalPriceLabel}
      taxAmountLabel={modalState.taxAmountLabel}
      estimatedTotalLabel={modalState.estimatedTotalLabel}
      taxPostalCode={modalState.taxPostalCode}
      taxRequiresPostalCode={modalState.taxRequiresPostalCode}
      onTaxPostalCodeChange={modalState.setTaxPostalCode}
    />
  ),
})
