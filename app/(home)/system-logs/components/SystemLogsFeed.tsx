'use client'

import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SystemLogCard } from './SystemLogCard'
import { SystemLogSkeletonCard } from './SystemLogSkeletonCard'
import { SystemLogsEmptyState } from './SystemLogsEmptyState'
import { DateGroupHeader } from '../styles/StyledComponents'
import { groupByWeek } from '../utils/groupByWeek'
import type { SystemLogItem } from '../types/systemLog'

interface SystemLogsFeedProps {
  logs: SystemLogItem[]
  isLoading: boolean
}

export function SystemLogsFeed({ logs, isLoading }: SystemLogsFeedProps) {
  const { t, i18n } = useTranslation()

  if (isLoading) {
    return (
      <Stack gap={1.5}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SystemLogSkeletonCard key={index} />
        ))}
      </Stack>
    )
  }

  if (logs.length === 0) return <SystemLogsEmptyState />

  const groups = groupByWeek(logs, t, i18n.language)

  return (
    <Stack gap={2}>
      {groups.map(({ key, label, items }) => (
        <Stack key={key} gap={1}>
          <DateGroupHeader>{label}</DateGroupHeader>
          <Stack gap={1.5}>
            {items.map(log => (
              <SystemLogCard key={log.id} log={log} />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
