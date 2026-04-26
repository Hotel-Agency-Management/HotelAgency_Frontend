import { Divider, Stack, TextField, Typography } from '@mui/material'
import type { ReservationSummaryItem } from '../../types/customerReservationConfirmation'
import { SectionPanel } from './SectionPanel'
import { SummaryRow } from './SummaryRow'

interface BookingDetailsStepProps {
  bookingDetails: ReservationSummaryItem[]
  pricePerNightLabel: string
  totalPriceLabel: string
  taxAmountLabel: string
  estimatedTotalLabel: string
  taxPostalCode: string
  taxRequiresPostalCode: boolean
  onTaxPostalCodeChange: (value: string) => void
}

export function BookingDetailsStep({
  bookingDetails,
  pricePerNightLabel,
  totalPriceLabel,
  taxAmountLabel,
  estimatedTotalLabel,
  taxPostalCode,
  taxRequiresPostalCode,
  onTaxPostalCodeChange,
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
        {taxRequiresPostalCode ? (
          <TextField
            label="Postal code"
            value={taxPostalCode}
            onChange={event => onTaxPostalCodeChange(event.target.value)}
            size="small"
            fullWidth
            helperText="Postal code is required to calculate taxes for this hotel location."
          />
        ) : null}
        <SummaryRow label="Taxes and fees" value={taxAmountLabel} />
        <Divider />
        <SummaryRow label="Estimated total" value={estimatedTotalLabel} emphasis />
      </SectionPanel>
    </Stack>
  )
}
