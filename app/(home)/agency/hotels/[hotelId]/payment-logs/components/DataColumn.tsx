'use client'

import { Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

export interface DataColumnProps {
  label: string
  value: ReactNode
  align?: 'left' | 'center' | 'right'
  muted?: boolean
  valueColor?: string
  valueWeight?: number
  width?: number
}
const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export function DataColumn({
  label,
  value,
  align = 'left',
  muted,
  valueColor,
  valueWeight = 500,
  width,
}: DataColumnProps) {
  return (
    <Stack
      gap={0.5}
      minWidth={width}
      flexShrink={width ? 0 : undefined}
      alignItems={alignmentMap[align]}
    >
      <Typography variant="caption"  fontWeight={500}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={valueWeight}
        color={muted ? 'text.disabled' : valueColor ?? 'text.primary'}
        noWrap
      >
        {value}
      </Typography>
    </Stack>
  )
}
