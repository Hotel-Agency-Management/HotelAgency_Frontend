'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import BarChart from '@/components/charts/BarChart'
import DoughnutChart from '@/components/charts/DoughnutChart'

import { Stack, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Spinner from '@/components/loaders/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getChartColors } from '@/core/utils/chartColors'
import { LoadingBox } from '../styles/StyledComponents'
import {
  useAdminRevenue,
  useAdminPlanDistribution,
  useAdminAgencyStatusBreakdown,
  useAdminGrowthData,
} from '../hooks/queries/useAdminStatistic'
import { translateMonthLabel } from '@/core/utils/translateMonthLabel'

export default function DashboardChartsSection() {
  const theme = useTheme();
  const { t } = useTranslation();
  const colors = getChartColors(theme.palette.mode === "dark");

  const revenueQuery = useAdminRevenue();
  const planDistributionQuery = useAdminPlanDistribution();
  const agencyStatusQuery = useAdminAgencyStatusBreakdown();
  const growthQuery = useAdminGrowthData();

  const isLoading = revenueQuery.isLoading || planDistributionQuery.isLoading || agencyStatusQuery.isLoading || growthQuery.isLoading;
  const isError = revenueQuery.isError || planDistributionQuery.isError || agencyStatusQuery.isError || growthQuery.isError;

  if (isLoading) {
    return (
      <LoadingBox>
        <Spinner />
      </LoadingBox>
    )
  }

  if (isError) {
    return <ErrorMessage message={t('dashboard.admin.charts.loadError', { defaultValue: 'Failed to load dashboard charts' })} />
  }

  const revenueData = revenueQuery.data?.revenue ?? [];
  const revenueChartLabels = revenueData.map(item => translateMonthLabel(item.month, t));
  const revenueChartData = revenueData.map(item => item.amount);

  const planDistributionData = (planDistributionQuery.data?.breakdown ?? []).map(item => ({
    label: item.planName,
    value: item.count,
  }));

  const agencyStatusData = (agencyStatusQuery.data?.breakdown ?? []).map(item => ({
    label: item.status,
    value: item.count,
  }));

  const growthData = growthQuery.data?.growth ?? [];
  const growthChartLabels = growthData.map(item => translateMonthLabel(item.month, t));
  const growthChartData = growthData.map(item => item.count);

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
              data={revenueChartData}
              labels={revenueChartLabels}
              color={colors[1]}
              percentage={true}
              height={220}
              labelRows={2}
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
              data={planDistributionData}
              colors={colors}
              height={220}
              percentage
              legendPosition='bottom'
              legendAlign='center'
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
              data={agencyStatusData}
              colors={colors}
              height={220}
              percentage
              legendPosition='bottom'
              legendAlign='center'
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
              data={growthChartData}
              labels={growthChartLabels}
              color={colors[1]}
              percentage={true}
              height={220}
              labelRows={2}
            />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
