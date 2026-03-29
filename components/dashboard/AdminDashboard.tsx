'use client'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import StatCard from '@/components/charts/StatCard'
import ChartCard from '@/components/charts/ChartCard'
import AreaChart from '@/components/charts/AreaChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart'
import ClusteredBarChart from '@/components/charts/ClusteredBarChart'
import { Stack } from '@mui/material'
import themeConfig from '@/core/configs/themeConfig'

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const subscriptionTrend = [5, 8, 6, 9, 12, 10, 14, 16, 18, 22]
const orderTrend = [280, 310, 340, 330, 350, 360, 355, 340, 325, 320]
const revenueTrend = [900, 940, 920, 960, 1000, 980, 1020, 1040, 1060, 1080]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const revenueSeries = [
  { label: 'Online', data: [30, 40, 35, 55, 48, 72] },
  { label: 'In-Store', data: [12, 18, 16, 18, 17, 17] }
]

const trafficSources = [
  { label: 'Direct', value: 45 },
  { label: 'Organic', value: 30 },
  { label: 'Referral', value: 15 },
  { label: 'Social', value: 10 }
]

const departments = ['Sales', 'Engineering', 'Design', 'Marketing', 'Support']
const headcount = [24, 40, 12, 18, 30]

const salesLabels = ['Q1', 'Q2', 'Q3', 'Q4']
const salesSeries = [
  { label: '2023', data: [42, 58, 51, 73] },
  { label: '2024', data: [60, 72, 68, 89] }
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminDashboard() {
  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Stack gap={themeConfig.common.commonSpacing}>
        <Typography variant='h5' fontWeight={700}>
          Dashboard
        </Typography>

        {/* Row 1: KPI stat cards */}
        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard title='New Subscriptions' value={22} change={15} data={subscriptionTrend} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard title='New Orders' value={320} change={-4} data={orderTrend} colors={['#ff6b35']} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard title='Avg. Order Revenue' value='$1,080' change={8} data={revenueTrend} colors={['#7c5cbf']} />
          </Grid>
        </Grid>

        {/* Row 2: Revenue trend + Traffic doughnut */}
        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <ChartCard title='Revenue by Channel'>
              <AreaChart series={revenueSeries} labels={months} height={280} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <ChartCard title='Traffic Sources'>
              <DoughnutChart data={trafficSources} height={280} percentage />
            </ChartCard>
          </Grid>
        </Grid>

        {/* Row 3: Headcount + Sales comparison */}
        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title='Headcount by Department'>
              <HorizontalBarChart data={headcount} labels={departments} percentage />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartCard title='Annual Sales Comparison'>
              <ClusteredBarChart series={salesSeries} labels={salesLabels} height={280} />
            </ChartCard>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
