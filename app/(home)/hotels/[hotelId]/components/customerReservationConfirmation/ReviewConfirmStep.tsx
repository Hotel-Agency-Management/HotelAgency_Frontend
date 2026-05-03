import { Box, Divider, Stack, Typography } from '@mui/material'
import type {
  ReservationDetails,
  ReservationSummaryItem,
} from '../../types/customerReservationConfirmation'
import { SectionPanel } from './SectionPanel'
import { SummaryRow } from './SummaryRow'

interface ReviewConfirmStepProps {
  bookingDetails: ReservationSummaryItem[]
  reservation: ReservationDetails
  roomTypeLabel: string
  signatureDataUrl: string
  termsAccepted: boolean
  totalPriceLabel: string
}

export function ReviewConfirmStep({
  bookingDetails,
  reservation,
  roomTypeLabel,
  signatureDataUrl,
  termsAccepted,
  totalPriceLabel,
}: ReviewConfirmStepProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        Review the final reservation summary before confirming.
      </Typography>

      <SectionPanel title="Final summary">
        <SummaryRow label="Hotel" value={reservation.hotelName} />
        <SummaryRow label="Room" value={`${reservation.roomNumber} - ${roomTypeLabel}`} />
        <SummaryRow
          label="Dates"
          value={`${bookingDetails[3].value} - ${bookingDetails[4].value}`}
        />
        <SummaryRow
          label="Occupancy"
          value={`${reservation.guests} guests, ${reservation.rooms} rooms`}
        />
        <SummaryRow label="Taxes and fees" value="Included where applicable" />
        <Divider />
        <SummaryRow label="Estimated total" value={totalPriceLabel} emphasis />
      </SectionPanel>

      <SectionPanel title="Approvals">
        <SummaryRow label="Terms accepted" value={termsAccepted ? 'Yes' : 'No'} />
        <SummaryRow label="Signature" value={signatureDataUrl ? 'Captured' : 'Missing'} />
        {signatureDataUrl ? (
          <Box
            component="img"
            className="customer-reservation-signature-preview"
            src={signatureDataUrl}
            alt="Customer signature"
          />
        ) : null}
      </SectionPanel>
    </Stack>
  )
}
