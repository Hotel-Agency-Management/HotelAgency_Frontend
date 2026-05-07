'use client'

import BarChart from '@/components/charts/BarChart'
import { Card, CardContent, Typography, Stack } from '@mui/material'
import { WEEKLY_RESERVATIONS } from '../data/frontDeskMock'

export function WeeklyReservationChart() {

  return (
    <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Weekly Reservation Volume
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
