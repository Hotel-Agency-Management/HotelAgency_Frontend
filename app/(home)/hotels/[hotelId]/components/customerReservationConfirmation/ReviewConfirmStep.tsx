import { Alert, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
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
  documentsGenerating: boolean
  hasGeneratedDocuments: boolean
}

export function ReviewConfirmStep({
  bookingDetails,
  reservation,
  roomTypeLabel,
  signatureDataUrl,
  termsAccepted,
  totalPriceLabel,
  documentsGenerating,
  hasGeneratedDocuments,
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

      <SectionPanel title="Documents">
        <Stack spacing={1.5}>
          <SummaryRow
            label="Contract and invoice"
            value={
              hasGeneratedDocuments
                ? 'Ready'
                : documentsGenerating
                  ? 'Preparing...'
                  : 'Prepared when you confirm'
            }
          />
          {documentsGenerating ? (
            <Alert icon={<CircularProgress size={18} color="inherit" />} severity="info">
              Preparing your contract and invoice for this reservation.
            </Alert>
          ) : null}
          {hasGeneratedDocuments ? (
            <Alert icon={<CheckCircle2 size={18} />} severity="success">
              Contract and invoice files are ready to attach to this reservation.
            </Alert>
          ) : null}
        </Stack>
      </SectionPanel>
    </Stack>
  )
}
