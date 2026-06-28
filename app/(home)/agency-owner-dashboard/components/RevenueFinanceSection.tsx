'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthContext'
import LineChart from '@/components/charts/LineChart'
import ClusteredBarChart from '@/components/charts/ClusteredBarChart'
import { useProfitAndExpenseTrends, useRevenueTrends } from '../hooks/queries/useStatisticQueries'

export default function RevenueFinanceSection({ agencyId: agencyIdProp }: { agencyId?: number }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const agencyId = agencyIdProp ?? (user?.agencyId !== undefined ? Number(user.agencyId) : undefined)
  const revenueTrendsQuery = useRevenueTrends(agencyId)
  const profitExpenseQuery = useProfitAndExpenseTrends(agencyId)

  const revenueTrendData = revenueTrendsQuery.data ?? []
  const profitExpenseData = profitExpenseQuery.data ?? []

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
                labels={revenueTrendData.map(item => `${item.month} ${item.year}`)}
                height={260}
                percentage
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
              <ClusteredBarChart
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
                labels={profitExpenseData.map(item => `${item.month} ${item.year}`)}
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
