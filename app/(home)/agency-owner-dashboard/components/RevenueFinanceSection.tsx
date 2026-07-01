'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import LineChart from '@/components/charts/LineChart'
import StackedBarChart from '@/components/charts/StackedBarChart'
import { useProfitAndExpenseTrends, useRevenueTrends } from '../hooks/queries/useStatisticQueries'
import { buildMonthYearLabels } from '@/core/utils/translateMonthLabel'
import { NoAgencySelectedState } from './NoAgencySelectedState'

export default function RevenueFinanceSection({ agencyId }: { agencyId?: number }) {
  const { t } = useTranslation()
  const revenueTrendsQuery = useRevenueTrends(agencyId)
  const profitExpenseQuery = useProfitAndExpenseTrends(agencyId)

  const revenueTrendData = revenueTrendsQuery.data ?? []
  const profitExpenseData = profitExpenseQuery.data ?? []

  if (!agencyId) return <NoAgencySelectedState />

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.revenueTrend', { defaultValue: 'Revenue Trend' })}</Typography>
              <LineChart
                series={[
                  {
                    label: t('dashboard.agencyOwner.chartSeries.revenue', { defaultValue: 'Revenue' }),
                    data: revenueTrendData.map(item => item.revenue),
                  },
                ]}
                labels={buildMonthYearLabels(revenueTrendData, t)}
                height={260}
                percentage
                labelRows={2}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">{t('dashboard.agencyOwner.charts.profitVsExpenses', { defaultValue: 'Profit vs Expenses' })}</Typography>
              <StackedBarChart
                series={[
                  {
                    label: t('dashboard.agencyOwner.chartSeries.profit', { defaultValue: 'Profit' }),
                    data: profitExpenseData.map(item => item.profit),
                  },
                  {
                    label: t('dashboard.agencyOwner.chartSeries.expenses', { defaultValue: 'Expenses' }),
                    data: profitExpenseData.map(item => item.expenses),
                  },
                ]}
                labels={buildMonthYearLabels(profitExpenseData, t)}
                height={260}
                showLegend
                normalized
                labelRows={2}
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
