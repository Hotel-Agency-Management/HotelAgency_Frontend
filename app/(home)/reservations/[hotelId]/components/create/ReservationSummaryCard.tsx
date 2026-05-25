import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { BedDouble, CalendarDays, ClipboardList, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ReservationSummaryRow } from './ReservationSummaryRow'
import {
  buildReservationSummaryCardData,
  type ReservationSummarySnapshot
} from '../../utils/buildReservationSummaryCardData'

interface ReservationSummaryCardProps {
  snapshot: ReservationSummarySnapshot
}

export function ReservationSummaryCard({ snapshot }: ReservationSummaryCardProps) {
  const { t } = useTranslation()
  const summary = buildReservationSummaryCardData({ snapshot })

  return (
    <Paper variant='card'>
      <Stack spacing={2.5} sx={{ height: 1 }}>
        <Box>
          <Typography variant='overline' sx={{ color: 'text.disabled' }}>
            {t('reservations.summary.snapshot', { defaultValue: 'Reservation Snapshot' })}
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            {t('reservations.summary.directHotel', { defaultValue: 'Direct Hotel Reservation' })}
          </Typography>
          <Typography variant='body2'>
            {t('reservations.summary.snapshotDesc', {
              defaultValue: 'A cleaner handoff for guest details, stay dates, and reservation source.'
            })}
          </Typography>
        </Box>

        <Divider />

        <Stack sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Stack spacing={2.5}>
            <ReservationSummaryRow
              icon={BedDouble}
              label={t('reservations.summary.rooms', { defaultValue: 'Rooms' })}
              value={summary.roomsValue}
            />
            <ReservationSummaryRow
              icon={CalendarDays}
              label={t('reservations.summary.stay', { defaultValue: 'Stay' })}
              value={summary.stayValue}
            />
            <ReservationSummaryRow
              icon={Users}
              label={t('reservations.summary.occupancy', { defaultValue: 'Occupancy' })}
              value={summary.occupancyValue}
            />
            <ReservationSummaryRow
              icon={ClipboardList}
              label={t('reservations.summary.source', { defaultValue: 'Source' })}
              value={summary.sourceValue}
            />
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle2' color='text.secondary'>
                {t('reservations.summary.totalReservation', { defaultValue: 'Total Reservation' })}
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
