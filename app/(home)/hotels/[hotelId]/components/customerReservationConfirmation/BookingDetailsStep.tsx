import { Checkbox, Divider, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
  hasInsurance: boolean
  insuranceFeeLabel: string | null
  includeInsurance: boolean
  onIncludeInsuranceChange: (value: boolean) => void
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
  hasInsurance,
  insuranceFeeLabel,
  includeInsurance,
  onIncludeInsuranceChange,
}: BookingDetailsStepProps) {
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        {t('hotelPortal.booking.reviewBeforeContinuing', 'Review the reservation details, dates, pricing, and taxes before continuing.')}
      </Typography>

      <SectionPanel title={t('hotelPortal.booking.bookingDetails', 'Booking details')}>
        {bookingDetails.map(item => (
          <SummaryRow key={item.label} label={item.label} value={item.value} />
        ))}
      </SectionPanel>

      <SectionPanel title={t('hotelPortal.booking.priceAndTaxes', 'Price and taxes')}>
        <SummaryRow label={t('hotelPortal.card.perNightFull', 'Price per night')} value={pricePerNightLabel} />
        <SummaryRow label={t('hotelPortal.booking.roomCharges', 'Room charges')} value={totalPriceLabel} />
        {taxRequiresPostalCode ? (
          <TextField
            label={t('hotelPortal.booking.postalCode', 'Postal code')}
            value={taxPostalCode}
            onChange={event => onTaxPostalCodeChange(event.target.value)}
            size="small"
            fullWidth
            helperText={t('hotelPortal.booking.postalCodeRequired', 'Postal code is required to calculate taxes for this hotel location.')}
          />
        ) : null}
        <SummaryRow label={t('hotelPortal.booking.taxesAndFees', 'Taxes and fees')} value={taxAmountLabel} />
        <Divider />
        <SummaryRow label={t('hotelPortal.booking.estimatedTotalFull', 'Estimated total')} value={estimatedTotalLabel} emphasis />
      </SectionPanel>

      <SectionPanel title={t('hotelPortal.booking.insurance', 'Insurance')}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeInsurance}
              onChange={event => onIncludeInsuranceChange(event.target.checked)}
              size="small"
            />
          }
          label={
            <Stack>
              <Typography variant="body2">{t('hotelPortal.booking.includeInsurance', 'Include insurance')}</Typography>
              <Typography variant="caption">
                {hasInsurance && insuranceFeeLabel
                  ? t('hotelPortal.booking.insuranceFeePerReservation', { fee: insuranceFeeLabel, defaultValue: '{{fee}} / reservation' })
                  : t('hotelPortal.booking.noInsuranceFee', 'No additional insurance fee configured for this room.')}
              </Typography>
            </Stack>
          }
        />
      </SectionPanel>
    </Stack>
  )
}
