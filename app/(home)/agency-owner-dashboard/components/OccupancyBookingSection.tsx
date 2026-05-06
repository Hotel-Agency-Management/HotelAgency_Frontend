'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import BarChart from '@/components/charts/BarChart'
import LineChart from '@/components/charts/LineChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import {
  OCCUPANCY_BY_HOTEL,
  CHECKINS_CHECKOUTS_SERIES,
  BOOKING_TYPE_DISTRIBUTION,
  HOTEL_NAMES_SHORT,
  MONTHS,
} from '../data/agencyOwnerDashboardMock'

export default function OccupancyBookingSection() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12 }} display="flex">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Occupancy Rate per Hotel</Typography>
              <BarChart data={OCCUPANCY_BY_HOTEL} labels={HOTEL_NAMES_SHORT} height={240} percentage />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }} display="flex">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Check-ins vs Check-outs</Typography>
              <LineChart
                series={CHECKINS_CHECKOUTS_SERIES}
                labels={MONTHS}
                height={260}
                showLegend
                legendPosition='bottom'
                legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }} display="flex">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Booking Types Distribution</Typography>
              <DoughnutChart
                data={BOOKING_TYPE_DISTRIBUTION}
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
    </Grid>
  )
}
