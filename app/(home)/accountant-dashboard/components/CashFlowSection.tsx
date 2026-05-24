'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import ChartFactory from '@/components/charts/ChartFactory'
import { MONTHS, CASH_FLOW_SERIES, BALANCE_TREND_SERIES } from '../data/accountantDashboardMock'

export default function CashFlowSection() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12 }}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.accountant.charts.incomingVsOutgoingCashFlow', { defaultValue: 'Incoming vs Outgoing Cash Flow' })}
              </Typography>
              <ChartFactory
                type="Area"
                series={CASH_FLOW_SERIES}
                labels={MONTHS}
                height={260}
                showLegend
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12}}>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {t('dashboard.accountant.charts.currentBalanceTrend', { defaultValue: 'Current Balance Trend' })}
              </Typography>
              <ChartFactory
                type="Line"
                series={BALANCE_TREND_SERIES}
                labels={MONTHS}
                height={260}
                showLegend={false}
                percentage
              />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
