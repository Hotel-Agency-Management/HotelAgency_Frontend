'use client'

import BarChart from '@/components/charts/BarChart'
import { Card, CardContent, Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { WEEKLY_RESERVATIONS } from '../data/frontDeskMock'

export function WeeklyReservationChart() {
  const { t } = useTranslation()

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.frontDesk.weeklyReservations.title', { defaultValue: 'Weekly Reservation Volume' })}
          </Typography>
        </Stack>

        <BarChart
          percentage
          data={WEEKLY_RESERVATIONS.map(item => item.value)}
          labels={WEEKLY_RESERVATIONS.map(item => item.label)}
          height={240}
        />
      </CardContent>
    </Card>
  )
}
