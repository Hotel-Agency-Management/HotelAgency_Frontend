'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import DoughnutChart from '@/components/charts/DoughnutChart'
import { guestRequestsData, guestRequestsTotal } from '../data/frontDeskDerivedData'

export function GuestRequestsChart() {

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Guest Requests
          </Typography>
          <Typography variant="caption">
            {guestRequestsTotal} total
          </Typography>
        </Stack>

        <DoughnutChart
          data={guestRequestsData}
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
