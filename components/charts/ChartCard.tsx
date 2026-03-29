'use client'

import type { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import themeConfig from '@/core/configs/themeConfig'

export interface ChartCardProps {
  children: ReactNode
  title?: string
  padding?: number
}

export default function ChartCard({ children, title, padding = 3 }: ChartCardProps) {
  return (
    <Card variant='outlined' sx={{ borderRadius: themeConfig.common.commonBorderRadius, overflow: 'hidden', height: '100%' }}>
      <CardContent sx={{ p: padding, '&:last-child': { pb: padding } }}>
        {title && (
          <Typography variant='subtitle1' fontWeight={600} mb={2}>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  )
}
