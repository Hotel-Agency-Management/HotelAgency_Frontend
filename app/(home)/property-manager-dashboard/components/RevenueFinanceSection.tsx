'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import { ADR_SERIES, REVPAR_DATA, MONTHS } from '../data/propertyManagerDashboardMock'

export default function RevenueFinanceSection() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Average Daily Room Rate Trend</Typography>
              <LineChart
                series={ADR_SERIES}
                labels={MONTHS}
                height={240}
                showLegend={false}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Revenue per Available Room</Typography>
              <BarChart
                data={REVPAR_DATA}
                labels={MONTHS}
                height={240}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
