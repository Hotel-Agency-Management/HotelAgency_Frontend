'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import DoughnutChart from '@/components/charts/DoughnutChart'
import { ROOM_READINESS_STATS } from '../data/frontDeskMock'
import { ROOM_STATUS_LABELS } from '../constants/frontDeskConstants'

export function RoomReadinessDonut() {
  const data = ROOM_READINESS_STATS.map((s) => ({
    label: ROOM_STATUS_LABELS[s.status],
    value: s.count,
  }))
  const total = ROOM_READINESS_STATS.reduce((sum, s) => sum + s.count, 0)
  const ready = ROOM_READINESS_STATS.find((s) => s.status === 'ready')?.count ?? 0

  return (
    <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Room Readiness Status
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {ready}/{total} ready
          </Typography>
        </Stack>

        <DoughnutChart
          data={data}
          percentage
          innerRadius={55}
          paddingAngle={3}
          cornerRadius={4}
          height={240}
          legendPosition="bottom"
          legendAlign="center"
        />
      </CardContent>
    </Card>
  )
}
