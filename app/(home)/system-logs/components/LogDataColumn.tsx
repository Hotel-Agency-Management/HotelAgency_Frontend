'use client'

import { Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface LogDataColumnProps {
  label: string
  value: ReactNode
  align?: 'left' | 'center' | 'right'
  width?: number
}

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

export function LogDataColumn({ label, value, align = 'left', width }: LogDataColumnProps) {
  return (
    <Stack gap={0.5} minWidth={width} flexShrink={width ? 0 : undefined} alignItems={alignmentMap[align]}>
      <Typography variant='caption' fontWeight={500} color='text.disabled'>
        {label}
      </Typography>
      <Typography variant='body2' fontWeight={500} noWrap>
        {value}
      </Typography>
    </Stack>
  )
}
