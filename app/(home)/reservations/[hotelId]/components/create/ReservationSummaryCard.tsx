import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { BedDouble, CalendarDays, CreditCard, Users } from 'lucide-react'
import { ReservationSummaryRow } from './ReservationSummaryRow'
import {
  buildReservationSummaryCardData,
  type ReservationSummarySnapshot,
} from '../../utils/buildReservationSummaryCardData'

interface ReservationSummaryCardProps {
  totalAmount: number
  snapshot: ReservationSummarySnapshot
}

export function ReservationSummaryCard({ totalAmount, snapshot }: ReservationSummaryCardProps) {
  const summary = buildReservationSummaryCardData({ totalAmount, snapshot })

  return (
    <Paper variant='card'>
      <Stack spacing={2.5} sx={{ height: 1 }}>
        <Box>
          <Typography variant='overline' sx={{ letterSpacing: '0.12em', color: 'text.disabled' }}>
            Reservation Snapshot
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            Direct Hotel Reservation
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            A cleaner handoff for guest details, stay dates, and payment status.
          </Typography>
        </Box>

        <Divider />

        <Stack sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Stack spacing={2.5}>
            <ReservationSummaryRow icon={BedDouble} label='Room Type' value={summary.roomTypeLabel} />
            <ReservationSummaryRow icon={CalendarDays} label='Stay' value={summary.stayValue} />
            <ReservationSummaryRow icon={Users} label='Occupancy' value={summary.occupancyValue} />
            <ReservationSummaryRow icon={CreditCard} label='Payment' value={summary.paymentValue} />
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='body2' color='text.secondary'>
                Paid Amount
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 700 }}>
                {summary.paidAmount}
              </Typography>
            </Stack>

            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='body2' color='text.secondary'>
                Remaining
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 700 }}>
                {summary.remainingAmount}
              </Typography>
            </Stack>

            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle2' color='text.secondary'>
                Total Reservation
              </Typography>
              <Typography variant='subtitle1' sx={{ fontWeight: 800 }}>
                {summary.totalAmount}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}
