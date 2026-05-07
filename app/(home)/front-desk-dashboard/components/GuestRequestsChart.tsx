'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import { GUEST_REQUESTS } from '../data/frontDeskMock'
import DoughnutChart from '@/components/charts/DoughnutChart'

export function GuestRequestsChart() {

  const data = GUEST_REQUESTS.map((r) => ({ label: r.label, value: r.value }))
  const total = GUEST_REQUESTS.reduce((sum, r) => sum + r.value, 0)

  return (
    <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Guest Requests
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {total} total
          </Typography>
        </Stack>

        <DoughnutChart
          data={data}
          percentage
          innerRadius={60}
          paddingAngle={3}
          cornerRadius={4}
          height={260}
          legendPosition="bottom"
          legendAlign="center"
        />
      </CardContent>
    </Card>
  )
}
