import { Alert, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        {t('hotelPortal.booking.reviewFinalSummary', 'Review the final reservation summary before confirming.')}
      </Typography>

      <SectionPanel title={t('hotelPortal.booking.finalSummary', 'Final summary')}>
        <SummaryRow label={t('hotelPortal.booking.hotel', 'Hotel')} value={reservation.hotelName} />
        <SummaryRow label={t('hotelPortal.booking.room', 'Room')} value={`${reservation.roomNumber} - ${roomTypeLabel}`} />
        <SummaryRow
          label={t('hotelPortal.booking.dates', 'Dates')}
          value={`${bookingDetails[3].value} - ${bookingDetails[4].value}`}
        />
        <SummaryRow
          label={t('hotelPortal.booking.occupancy', 'Occupancy')}
          value={t('hotelPortal.booking.occupancySummary', {
            guests: t('hotelPortal.booking.guestCount', { count: reservation.guests }),
            rooms: t('hotelPortal.booking.roomCount', { count: reservation.rooms }),
            defaultValue: '{{guests}}, {{rooms}}',
          })}
        />
        <SummaryRow label={t('hotelPortal.booking.taxesAndFees', 'Taxes and fees')} value={t('hotelPortal.booking.includedWhereApplicable', 'Included where applicable')} />
        <Divider />
        <SummaryRow label={t('hotelPortal.booking.estimatedTotalFull', 'Estimated total')} value={totalPriceLabel} emphasis />
      </SectionPanel>

      <SectionPanel title={t('hotelPortal.booking.approvals', 'Approvals')}>
        <SummaryRow label={t('hotelPortal.booking.termsAccepted', 'Terms accepted')} value={termsAccepted ? t('common.yes', 'Yes') : t('common.no', 'No')} />
        <SummaryRow label={t('hotelPortal.booking.signature', 'Signature')} value={signatureDataUrl ? t('hotelPortal.booking.signatureCaptured', 'Captured') : t('hotelPortal.booking.signatureMissing', 'Missing')} />
        {signatureDataUrl ? (
          <Box
            component="img"
            className="customer-reservation-signature-preview"
            src={signatureDataUrl}
            alt={t('hotelPortal.booking.customerSignature', 'Customer signature')}
          />
        ) : null}
      </SectionPanel>

      <SectionPanel title={t('hotelPortal.booking.documents', 'Documents')}>
        <Stack spacing={1.5}>
          <SummaryRow
            label={t('hotelPortal.booking.contractAndInvoice', 'Contract and invoice')}
            value={
              hasGeneratedDocuments
                ? t('hotelPortal.booking.documentsReady', 'Ready')
                : documentsGenerating
                  ? t('hotelPortal.booking.documentsPreparing', 'Preparing...')
                  : t('hotelPortal.booking.documentsPreparedOnConfirm', 'Prepared when you confirm')
            }
          />
          {documentsGenerating ? (
            <Alert icon={<CircularProgress size={18} color="inherit" />} severity="info">
              {t('hotelPortal.booking.preparingContractInvoice', 'Preparing your contract and invoice for this reservation.')}
            </Alert>
          ) : null}
          {hasGeneratedDocuments ? (
            <Alert icon={<CheckCircle2 size={18} />} severity="success">
              {t('hotelPortal.booking.documentsReadyToAttach', 'Contract and invoice files are ready to attach to this reservation.')}
            </Alert>
          ) : null}
        </Stack>
      </SectionPanel>
    </Stack>
  )
}
