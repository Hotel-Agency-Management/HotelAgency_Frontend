import { useMemo, useState } from 'react'
import { systemLogsMock } from '../data/systemLogsMock'
import { DEFAULT_FILTERS, DEFAULT_PAGE_SIZE } from '../constants/systemLogsConstants'
import { getActionTypeConfig } from '../utils/getActionTypeConfig'
import type { SystemLogsFilters } from '../types/systemLog'

export function useSystemLogs() {
  const [filters, setFilters] = useState<SystemLogsFilters>(DEFAULT_FILTERS)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  function updateFilter<K extends keyof SystemLogsFilters>(key: K, value: SystemLogsFilters[K]) {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPageNumber(1)
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPageNumber(1)
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setPageNumber(1)
  }

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== '' ||
      filters.action !== '' ||
      filters.entityType !== '' ||
      filters.actorId !== '' ||
      filters.from !== null ||
      filters.to !== null,
    [filters]
  )

  const filteredLogs = useMemo(() => {
    const search = filters.search.trim().toLowerCase()
    const action = filters.action.trim().toLowerCase()
    const entityType = filters.entityType.trim().toLowerCase()
    const actorId = filters.actorId.trim()
    const fromTime = filters.from?.getTime()
    const toTime = filters.to?.getTime()

    return systemLogsMock.filter(log => {
      if (search && !log.description.toLowerCase().includes(search) && !log.actorName.toLowerCase().includes(search)) {
        return false
      }
      if (action && !log.action.toLowerCase().includes(action)) return false
      if (entityType && !log.entityType.toLowerCase().includes(entityType)) return false
      if (actorId && String(log.actorId) !== actorId) return false

      const createdAtTime = new Date(log.createdAt).getTime()
      if (fromTime !== undefined && createdAtTime < fromTime) return false
      if (toTime !== undefined && createdAtTime > toTime) return false

      return true
    })
  }, [filters])

  const totalCount = filteredLogs.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  const summary = useMemo(() => {
    const today = new Date()
    const counts = { created: 0, updated: 0, removed: 0, today: 0 }
    for (const log of filteredLogs) {
      const category = getActionTypeConfig(log.action).color
      if (category === 'success') counts.created += 1
      else if (category === 'info') counts.updated += 1
      else if (category === 'error') counts.removed += 1

      const createdAt = new Date(log.createdAt)
      if (
        createdAt.getFullYear() === today.getFullYear() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getDate() === today.getDate()
      ) {
        counts.today += 1
      }
    }
    return counts
  }, [filteredLogs])

  const paginatedLogs = useMemo(() => {
    const start = (pageNumber - 1) * pageSize
    return filteredLogs.slice(start, start + pageSize)
  }, [filteredLogs, pageNumber, pageSize])

  return {
    logs: paginatedLogs,
    totalCount,
    totalPages,
    summary,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize: handlePageSizeChange,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters
  }
}
