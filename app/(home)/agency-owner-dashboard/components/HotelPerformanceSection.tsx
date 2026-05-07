'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import {
  REVENUE_BY_HOTEL,
  HOTEL_NAMES_FULL,
} from '../data/agencyOwnerDashboardMock'

export default function HotelPerformanceSection() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12 }} display="flex">
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Revenue per Hotel</Typography>
              <HorizontalBarChart
                percentage
                data={REVENUE_BY_HOTEL}
                labels={HOTEL_NAMES_FULL}
                labelWidth={160}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
