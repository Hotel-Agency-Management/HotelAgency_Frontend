'use client'

import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'

export function SystemLogsEmptyState() {
  const { t } = useTranslation()
  return (
    <Stack minHeight={320} alignItems='center' justifyContent='center' gap={1.5}>
      <Icon icon='lucide:scroll-text' fontSize={48} />
      <Typography variant='h6'>{t('systemLogs.empty.title', { defaultValue: 'No activity found' })}</Typography>
      <Typography variant='body2' color='text.disabled'>
        {t('systemLogs.empty.subtitle', { defaultValue: 'No log entries match the current filters.' })}
      </Typography>
    </Stack>
  )
}
