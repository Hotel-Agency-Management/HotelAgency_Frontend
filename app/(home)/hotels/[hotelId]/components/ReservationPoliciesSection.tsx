'use client'

import { Alert, Stack, Typography } from '@mui/material'
import { ShieldCheck } from 'lucide-react'

interface ReservationPoliciesSectionProps {
  canModify: boolean
  freeCancellation: boolean
  modificationDeadlineLabel: string
  freeCancellationDeadlineLabel: string
  cancellationFeeLabel: string
}

export function ReservationPoliciesSection({
  canModify,
  freeCancellation,
  modificationDeadlineLabel,
  freeCancellationDeadlineLabel,
  cancellationFeeLabel,
}: ReservationPoliciesSectionProps) {
  return (
    <Stack gap={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        Policies
      </Typography>

      <Alert icon={<ShieldCheck size={18} />} severity={canModify ? 'info' : 'warning'}>
        <Typography variant="body2" fontWeight={600}>
          Modification window
        </Typography>
        <Typography variant="body2">
          {canModify
            ? `Reservation changes are allowed until ${modificationDeadlineLabel}.`
            : 'Reservation changes are allowed only during the first 24 hours after booking.'}
        </Typography>
      </Alert>

      <Alert severity={freeCancellation ? 'success' : 'warning'}>
        <Typography variant="body2" fontWeight={600}>
          Cancellation policy
        </Typography>
        <Typography variant="body2">
          {freeCancellation
            ? `Cancellation is free until ${freeCancellationDeadlineLabel}.`
            : `Free cancellation window ended. Current fee: ${cancellationFeeLabel}.`}
        </Typography>
      </Alert>
    </Stack>
  )
}

