import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { BedDouble, CalendarDays, ClipboardList, Users } from 'lucide-react'
import { ReservationSummaryRow } from './ReservationSummaryRow'
import {
  buildReservationSummaryCardData,
  type ReservationSummarySnapshot,
} from '../../utils/buildReservationSummaryCardData'

interface ReservationSummaryCardProps {
  snapshot: ReservationSummarySnapshot
}

export function ReservationSummaryCard({ snapshot }: ReservationSummaryCardProps) {
  const summary = buildReservationSummaryCardData({ snapshot })

  return (
    <Paper variant='card'>
      <Stack spacing={2.5} sx={{ height: 1 }}>
        <Box>
          <Typography variant='overline' sx={{ color: 'text.disabled' }}>
            Reservation Snapshot
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            Direct Hotel Reservation
          </Typography>
          <Typography variant='body2'>
            A cleaner handoff for guest details, stay dates, and reservation source.
          </Typography>
        </Box>

        <Divider />

        <Stack sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Stack spacing={2.5}>
            <ReservationSummaryRow icon={BedDouble} label='Rooms' value={summary.roomsValue} />
            <ReservationSummaryRow icon={CalendarDays} label='Stay' value={summary.stayValue} />
            <ReservationSummaryRow icon={Users} label='Occupancy' value={summary.occupancyValue} />
            <ReservationSummaryRow icon={ClipboardList} label='Source' value={summary.sourceValue} />
          </Stack>

          <Divider />

          <Stack spacing={2}>
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
