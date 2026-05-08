'use client'

import { Card, CardContent, Typography, Stack } from '@mui/material'
import DoughnutChart from '@/components/charts/DoughnutChart'
import { ROOM_READINESS_STATS } from '../data/frontDeskMock'
import { ROOM_STATUS_LABELS } from '../constants/frontDeskConstants'
import { readyRoomsCount, roomReadinessTotal } from '../data/frontDeskDerivedData'

export function RoomReadinessDonut() {
  const data = ROOM_READINESS_STATS.map((s) => ({
    label: ROOM_STATUS_LABELS[s.status],
    value: s.count,
  }))

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Room Readiness Status
          </Typography>
          <Typography variant="caption">
            {readyRoomsCount}/{roomReadinessTotal} ready
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
