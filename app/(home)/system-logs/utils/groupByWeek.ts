import type { TFunction } from 'i18next'
import { getWeekStart, formatWeekLabel } from './dateFormat'
import type { SystemLogItem } from '../types/systemLog'

export interface SystemLogsGroup {
  key: string
  label: string
  items: SystemLogItem[]
}

export function groupByWeek(logs: SystemLogItem[], t: TFunction, locale: string): SystemLogsGroup[] {
  const map: Record<string, { monday: Date; items: SystemLogItem[] }> = {}
  for (const log of logs) {
    const monday = getWeekStart(new Date(log.createdAt))
    const key = monday.toISOString()
    if (!map[key]) map[key] = { monday, items: [] }
    map[key].items.push(log)
  }
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, { monday, items }]) => ({ key, label: formatWeekLabel(monday, t, locale), items }))
}
