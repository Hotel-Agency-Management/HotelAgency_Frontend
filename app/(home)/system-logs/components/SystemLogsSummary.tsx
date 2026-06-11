'use client'

import Grid from '@mui/material/Grid'
import { Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { SummaryCard, SummaryIconBadge } from '../styles/StyledComponents'

interface SystemLogsSummaryProps {
  total: number
  today: number
  created: number
  updated: number
  removed: number
}

export function SystemLogsSummary({ total, today, created, updated, removed }: SystemLogsSummaryProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  const stats = [
    {
      label: t('systemLogs.summary.total', { defaultValue: 'Total Events' }),
      value: total,
      icon: 'lucide:activity',
      color: theme.palette.primary.main
    },
    {
      label: t('systemLogs.summary.today', { defaultValue: 'Today' }),
      value: today,
      icon: 'lucide:calendar-clock',
      color: theme.palette.secondary.main
    },
    {
      label: t('systemLogs.summary.created', { defaultValue: 'Created / Approved' }),
      value: created,
      icon: 'lucide:plus-circle',
      color: theme.palette.success.main
    },
    {
      label: t('systemLogs.summary.updated', { defaultValue: 'Updated' }),
      value: updated,
      icon: 'lucide:pencil',
      color: theme.palette.info.main
    },
    {
      label: t('systemLogs.summary.removed', { defaultValue: 'Cancelled / Rejected' }),
      value: removed,
      icon: 'lucide:x-circle',
      color: theme.palette.error.main
    }
  ]

  return (
    <Grid container spacing={2}>
      {stats.map(stat => (
        <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 'grow' }}>
          <SummaryCard variant='outlined' $color={stat.color}>
            <Stack direction='row' alignItems='center' gap={2}>
              <SummaryIconBadge $color={stat.color}>
                <Icon icon={stat.icon} fontSize={22} />
              </SummaryIconBadge>
              <Stack gap={0.25}>
                <Typography variant='h5' fontWeight={800}>
                  {stat.value}
                </Typography>
                <Typography variant='caption' color='text.secondary' fontWeight={600}>
                  {stat.label}
                </Typography>
              </Stack>
            </Stack>
          </SummaryCard>
        </Grid>
      ))}
    </Grid>
  )
}
