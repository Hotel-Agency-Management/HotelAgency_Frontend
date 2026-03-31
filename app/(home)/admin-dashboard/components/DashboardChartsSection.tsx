'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import BarChart from '@/components/charts/BarChart'
import DoughnutChart from '@/components/charts/DoughnutChart'

import { useTheme } from '@mui/material'
import { getChartColors } from '@/core/utils/chartColors'
import { REVENUE_CHART_DATA, REVENUE_CHART_LABELS, SUBSCRIPTION_CHART_DATA, APPROVAL_CHART_DATA, AGENCIES_GROWTH_CHART_DATA, AGENCIES_GROWTH_CHART_LABELS } from '../data/dashboardMock'

export default function DashboardChartsSection() {
  const theme = useTheme();
  const colors = getChartColors(theme.palette.mode === "dark");
  return (
    <Grid container spacing={3}>

      <Grid size={{ xs: 12 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Revenue Overview
            </Typography>
            <BarChart
              data={REVENUE_CHART_DATA}
              labels={REVENUE_CHART_LABELS}
              color={colors[1]}
              percentage={true}
              height={220}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Subscription Distribution
            </Typography>
            <DoughnutChart
              data={SUBSCRIPTION_CHART_DATA}
              colors={colors}
              height={220}
              percentage
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Approval Status
            </Typography>
            <DoughnutChart
              data={APPROVAL_CHART_DATA}
              colors={colors}
              height={220}
              percentage
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Agencies Growth
            </Typography>
            <BarChart
              data={AGENCIES_GROWTH_CHART_DATA}
              labels={AGENCIES_GROWTH_CHART_LABELS}
              color={colors[1]}
              percentage={true}
              height={220}
            />
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
