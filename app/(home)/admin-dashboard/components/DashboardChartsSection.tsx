'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import BarChart from '@/components/charts/BarChart'
import DoughnutChart from '@/components/charts/DoughnutChart'

import { Stack, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getChartColors } from '@/core/utils/chartColors'
import { REVENUE_CHART_DATA, REVENUE_CHART_LABELS, SUBSCRIPTION_CHART_DATA, APPROVAL_CHART_DATA, AGENCIES_GROWTH_CHART_DATA, AGENCIES_GROWTH_CHART_LABELS } from '../data/dashboardMock'

export default function DashboardChartsSection() {
  const theme = useTheme();
  const { t } = useTranslation();
  const colors = getChartColors(theme.palette.mode === "dark");

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
            <Typography variant='h6'>
              {t('dashboard.admin.charts.revenueOverview', { defaultValue: 'Revenue Overview' })}
            </Typography>
            <BarChart
              data={REVENUE_CHART_DATA}
              labels={REVENUE_CHART_LABELS}
              color={colors[1]}
              percentage={true}
              height={220}
            />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
            <Typography variant='h6'>
              {t('dashboard.admin.charts.subscriptionDistribution', { defaultValue: 'Subscription Distribution' })}
            </Typography>
            <DoughnutChart
              data={SUBSCRIPTION_CHART_DATA}
              colors={colors}
              height={220}
              percentage
            />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
            <Typography variant='h6'>
              {t('dashboard.admin.charts.approvalStatus', { defaultValue: 'Approval Status' })}
            </Typography>
            <DoughnutChart
              data={APPROVAL_CHART_DATA}
              colors={colors}
              height={220}
              percentage
            />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant='outlined'>
          <CardContent>
            <Stack spacing={2}>
            <Typography variant='h6'>
              {t('dashboard.admin.charts.agenciesGrowth', { defaultValue: 'Agencies Growth' })}
            </Typography>
            <BarChart
              data={AGENCIES_GROWTH_CHART_DATA}
              labels={AGENCIES_GROWTH_CHART_LABELS}
              color={colors[1]}
              percentage={true}
              height={220}
            />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
