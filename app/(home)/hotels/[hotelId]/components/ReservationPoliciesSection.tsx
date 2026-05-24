'use client'

import { Alert, Stack, Typography } from '@mui/material'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ReservationPoliciesSectionProps {
  canModify: boolean
  freeCancellation: boolean
  modificationDeadlineLabel: string
  freeCancellationDeadlineLabel: string
  cancellationFeeRateLabel: string
  cancellationFeeLabel: string
}

export function ReservationPoliciesSection({
  canModify,
  freeCancellation,
  modificationDeadlineLabel,
  freeCancellationDeadlineLabel,
  cancellationFeeRateLabel,
  cancellationFeeLabel,
}: ReservationPoliciesSectionProps) {
  const { t } = useTranslation()

  return (
    <Stack gap={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        {t('hotelPortal.booking.policies', 'Policies')}
      </Typography>

      <Alert icon={<ShieldCheck size={18} />} severity={canModify ? 'info' : 'warning'}>
        <Typography variant="body2" fontWeight={600}>
          {t('hotelPortal.booking.modificationWindow', 'Modification window')}
        </Typography>
        <Typography variant="body2">
          {canModify
            ? t('hotelPortal.booking.modificationAllowedUntil', { deadline: modificationDeadlineLabel, defaultValue: 'Reservation changes are allowed until {{deadline}}.' })
            : t('hotelPortal.booking.modificationWindowClosed', 'Reservation changes are allowed only during the first 24 hours after booking.')}
        </Typography>
      </Alert>

      <Alert severity={freeCancellation ? 'success' : 'warning'}>
        <Typography variant="body2" fontWeight={600}>
          {t('hotelPortal.booking.cancellationPolicy', 'Cancellation policy')}
        </Typography>
        <Typography variant="body2">
          {freeCancellation
            ? t('hotelPortal.booking.freeCancellationUntil', { deadline: freeCancellationDeadlineLabel, rate: cancellationFeeRateLabel, defaultValue: 'Cancellation is free until {{deadline}}, then a {{rate}} fee applies.' })
            : t('hotelPortal.booking.cancellationFeeCurrently', { fee: cancellationFeeLabel, defaultValue: 'Cancellation is within the last 3 days before check-in. Current fee: {{fee}}.' })}
        </Typography>
      </Alert>
    </Stack>
  )
}

