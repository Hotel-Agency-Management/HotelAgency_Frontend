'use client'

import { alpha } from '@mui/material/styles'
import { Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import { BedDouble, PhoneCall, ReceiptText } from 'lucide-react'
import { DirectReservationForm } from './DirectReservationForm'
import { ReservationSummaryCard } from './ReservationSummaryCard'
import { useDirectReservationForm } from '../../hooks/useDirectReservationForm'
import type { DirectReservationFormValues } from '../../schema/directReservationSchema'

interface DirectReservationCreatePageProps {
  totalAmount?: number
  onSubmit?: (values: DirectReservationFormValues) => void
}

function defaultSubmit(_values: DirectReservationFormValues) {
  // TODO : add implementation when api ready
}

export default function DirectReservationCreatePage({
  totalAmount = 0,
  onSubmit = defaultSubmit,
}: DirectReservationCreatePageProps) {
  const {
    control,
    errors,
    isSubmitting,
    reservationSnapshot,
    handleFormSubmit,
    trigger,
  } = useDirectReservationForm({
    totalAmount,
    onSubmit,
  })

  return (
    <Stack spacing={3.5}>
      <Paper
        variant='card'
        sx={{
          background: theme =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
              theme.palette.background.paper,
              0.98
            )} 55%)`,
        }}
      >
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Chip icon={<PhoneCall size={14} />} label='Phone & Walk-in' variant='outlined' />
            <Chip icon={<BedDouble size={14} />} label='Hotel Reservation' variant='outlined' />
            <Chip icon={<ReceiptText size={14} />} label='Payment Tracking' variant='outlined' />
          </Stack>

          <Stack spacing={1}>
            <Typography variant='h4' sx={{ fontWeight: 800 }}>
              Create a hotel reservation
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 760 }}>
              Capture walk-in and phone reservations with guest details, stay dates, room selection, and payment in a guided step-by-step flow.
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={3.5} alignItems='flex-start'>
        <Grid size={{ xs: 12, lg: 8 }}>
          <DirectReservationForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
            trigger={trigger}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ReservationSummaryCard totalAmount={totalAmount} snapshot={reservationSnapshot} />
        </Grid>
      </Grid>
    </Stack>
  )
}
