'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Icon from '@/components/icon/Icon'
import SparklineChart from './SparklineChart'
import { useChartColors } from './utils/chartColors'
import themeConfig from '@/core/configs/themeConfig'

export interface StatCardProps {
  title: string
  value: string | number
  /** Positive = up (green), negative = down (red) */
  change: number
  subtitle?: string
  /** Sparkline data points */
  data: number[]
  color?: string
  colors?: string[]
  area?: boolean
}

export default function StatCard({
  title,
  value,
  change,
  subtitle = 'compared to last week',
  data,
  color,
  colors,
  area = true
}: StatCardProps) {
  const theme = useTheme()
  const chartColors = useChartColors(colors)
  const resolvedColor = color ?? chartColors[0]
  const isUp = change >= 0
  const badgeColor = isUp ? theme.palette.success.main : theme.palette.error.main

  return (
    <Card variant='outlined' sx={{ borderRadius: themeConfig.common.commonBorderRadius, overflow: 'hidden', height: '100%' }}>
      <CardContent sx={{ p: themeConfig.common.commonPadding, '&:last-child': { pb: 2.5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, flex: 1 }}>
          {/* Left: title → value + badge → subtitle */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant='body2' color='text.secondary' fontWeight={500}>
              {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant='h4' fontWeight={700} lineHeight={1}>
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    bgcolor: badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon icon={isUp ? 'lucide:arrow-up' : 'lucide:arrow-down'} fontSize={12} color='white' />
                </Box>
                <Typography variant='body2' fontWeight={700} sx={{ color: badgeColor }}>
                  {Math.abs(change)}%
                </Typography>
              </Box>
            </Box>

            <Typography variant='caption' color='text.secondary'>
              {subtitle}
            </Typography>
          </Box>

          {/* Right: sparkline */}
          <Box sx={{ width: '42%', alignSelf: 'stretch', minHeight: 80 }}>
            <SparklineChart data={data} area={area} color={resolvedColor} curve='monotoneX' height={100} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
