'use client'

import { Stack } from '@mui/material'
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

  const groups = groupByWeek(logs)

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
