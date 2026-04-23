import { Divider, Stack, Typography } from '@mui/material'
import type { ReservationSummaryItem } from '../../types/customerReservationConfirmation'
import { SectionPanel } from './SectionPanel'
import { SummaryRow } from './SummaryRow'

interface BookingDetailsStepProps {
  bookingDetails: ReservationSummaryItem[]
  pricePerNightLabel: string
  totalPriceLabel: string
}

export function BookingDetailsStep({
  bookingDetails,
  pricePerNightLabel,
  totalPriceLabel,
}: BookingDetailsStepProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        Review the reservation details, dates, pricing, and taxes before continuing.
      </Typography>

      <SectionPanel title="Booking details">
        {bookingDetails.map(item => (
          <SummaryRow key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionPanel>

      <SectionPanel title="Price and taxes">
        <SummaryRow label="Price per night" value={pricePerNightLabel} />
        <SummaryRow label="Room charges" value={totalPriceLabel} />
        <SummaryRow label="Taxes and fees" value="Included where applicable" />
        <Divider />
        <SummaryRow label="Estimated total" value={totalPriceLabel} emphasis />
      </SectionPanel>
    </Stack>
  )
}
