'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import DoughnutChart from '@/components/charts/DoughnutChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import {
  ROOM_STATUS_DISTRIBUTION,
  HOUSEKEEPING_TASKS,
  HOUSEKEEPING_LABELS,
} from '../data/propertyManagerDashboardMock'

export default function RoomsHousekeepingSection() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Room Status Distribution</Typography>
              <DoughnutChart
                data={ROOM_STATUS_DISTRIBUTION}
                percentage
                innerRadius={60}
                paddingAngle={3}
                cornerRadius={4}
                height={260}
                legendPosition="bottom"
                legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} >
        <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Housekeeping Tasks by Status</Typography>
              <HorizontalBarChart
                data={HOUSEKEEPING_TASKS}
                labels={HOUSEKEEPING_LABELS}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
