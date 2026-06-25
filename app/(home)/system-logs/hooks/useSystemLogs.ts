import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useAuth } from '@/core/context/AuthContext'
import { USER_ROLES } from '@/lib/abilities'
import { DEFAULT_FILTERS, DEFAULT_PAGE_SIZE } from '../constants/systemLogsConstants'
import { useAdminSystemLogsQuery, useAgencySystemLogsQuery, useHotelSystemLogsQuery } from './queries/useSystemLogsQueries'
import type { SystemLogsFilters, SystemLogsParams } from '../types/systemLog'

export function useSystemLogs() {
  const { user } = useAuth()
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

  const params = useMemo<SystemLogsParams>(() => {
    const actorId = filters.actorId.trim() ? Number(filters.actorId.trim()) : undefined

    return {
      pageNumber,
      pageSize,
      action: filters.action.trim() || undefined,
      entityType: filters.entityType.trim() || undefined,
      actorId: Number.isFinite(actorId) ? actorId : undefined,
      from: filters.from ? dayjs(filters.from).format('YYYY-MM-DD') : undefined,
      to: filters.to ? dayjs(filters.to).format('YYYY-MM-DD') : undefined,
      search: filters.search.trim() || undefined
    }
  }, [filters, pageNumber, pageSize])

  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN
  const isAgencyOwner = user?.role === USER_ROLES.AGENCY_OWNER
  const isPropertyManager = user?.role === USER_ROLES.PROPERTY_MANAGER
  const hotelId = user?.hotelId ? Number(user.hotelId) : undefined

  const adminQuery = useAdminSystemLogsQuery(params, isSuperAdmin)
  const agencyQuery = useAgencySystemLogsQuery(params, isAgencyOwner)
  const hotelQuery = useHotelSystemLogsQuery(hotelId, params, isPropertyManager)

  const activeQuery = isSuperAdmin ? adminQuery : isAgencyOwner ? agencyQuery : hotelQuery

  const logs = activeQuery.data?.items ?? []
  const totalCount = activeQuery.data?.totalCount ?? 0
  const totalPages = activeQuery.data?.totalPages ?? 1

  return {
    logs,
    totalCount,
    totalPages,
    isLoading: activeQuery.isLoading,
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
