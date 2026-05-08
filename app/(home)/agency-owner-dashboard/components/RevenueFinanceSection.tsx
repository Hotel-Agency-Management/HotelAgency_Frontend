'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import LineChart from '@/components/charts/LineChart'
import ClusteredBarChart from '@/components/charts/ClusteredBarChart'
import { REVENUE_SERIES, PROFIT_EXPENSES_SERIES, MONTHS } from '../data/agencyOwnerDashboardMock'

export default function RevenueFinanceSection() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Revenue Trend</Typography>
              <LineChart
              series={REVENUE_SERIES}
              labels={MONTHS} height={260}
              showLegend
              percentage
              legendPosition="bottom"
              legendAlign="center"/>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Profit vs Expenses</Typography>
              <ClusteredBarChart
              series={PROFIT_EXPENSES_SERIES}
              labels={MONTHS}
              height={260}
              showLegend
              percentage
              legendPosition='bottom'
              legendAlign="center"
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
