'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ChartFactory from '@/components/charts/ChartFactory'
import { View } from '../types/accountantDashboardTypes'
import { formatCurrency } from '../utils/currency'
import { NET_PROFIT_CHART_DATA } from '../constants/netProfitChart'

export default function NetProfitTrendSection() {
  const [view, setView] = useState<View>('monthly')

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, next: View | null) => {
    if (next) setView(next)
  }

  const chartData = NET_PROFIT_CHART_DATA[view]

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                Net Profit Trend
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Revenue − Expenses
              </Typography>
            </Stack>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              size="small"
            >
              <ToggleButton value="daily">Daily</ToggleButton>
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <ChartFactory
            type="Line"
            series={chartData.series}
            labels={chartData.labels}
            height={300}
            showLegend={false}
            curved
            formatValue={formatCurrency}
            percentage
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
