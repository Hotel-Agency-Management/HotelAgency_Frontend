'use client'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChartFactory from '@/components/charts/ChartFactory'
import {
  MONTHS,
  REVENUE_VS_EXPENSES_SERIES,
  REVENUE_BY_PAYMENT_TYPE,
  REFUND_IMPACT_DATA,
  MONTHLY_REVENUE_TREND,
  REVENUE_GROWTH_VALUE,
  REVENUE_GROWTH_THRESHOLDS,
} from '../data/accountantDashboardMock'

export default function RevenueAnalyticsSection() {
  return (
    <Stack spacing={2.5}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Revenue vs Expenses
            </Typography>
            <ChartFactory
              type="Area"
              series={REVENUE_VS_EXPENSES_SERIES}
              labels={MONTHS}
              height={280}
              showLegend
              percentage
            />
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Revenue by Payment Type
                </Typography>
                <ChartFactory
                  type="Bar"
                  data={REVENUE_BY_PAYMENT_TYPE.map(d => d.value)}
                  labels={REVENUE_BY_PAYMENT_TYPE.map(d => d.label)}
                  height={300}
                  percentage
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Refund Impact
                </Typography>
                <ChartFactory
                  type="Doughnut"
                  data={REFUND_IMPACT_DATA}
                  height={300}
                  showLegend
                  legendPosition="bottom"
                  legendAlign="center"
                  percentage
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%' }}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Revenue Growth
                </Typography>
                <Stack
                  flex={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <ChartFactory
                    type="Gauge"
                    value={REVENUE_GROWTH_VALUE}
                    valueMin={-20}
                    valueMax={100}
                    unit="%"
                    thresholds={REVENUE_GROWTH_THRESHOLDS}
                    height={220}
                  />
                  <Typography variant="caption" align="center" display="block" mt={0.5}>
                    Compared to last month
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Monthly Revenue Trend
                </Typography>
                <ChartFactory
                  type="Bar"
                  data={MONTHLY_REVENUE_TREND}
                  labels={MONTHS}
                  height={300}
                  percentage
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}
