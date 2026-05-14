'use client'

import { useCallback, useMemo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_RESERVATION_PAGE_SIZE } from '../constants/pagination'

type PaginationModel = { page: number; pageSize: number }

export function useReservationListControls() {
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: DEFAULT_RESERVATION_PAGE_SIZE,
  })
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(undefined)
  const [status, setStatus] = useState('')
  const [checkInFrom, setCheckInFrom] = useState('')
  const [checkInTo, setCheckInTo] = useState('')

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value || undefined)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }, 300)

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value)
      debouncedSetSearch(value)
    },
    [debouncedSetSearch]
  )

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value)
    setPaginationModel((prev) => ({ ...prev, page: 0 }))
  }, [])

  const queryParams = useMemo(
    () => ({
      pageNumber: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
      search: debouncedSearch,
      status: status || undefined,
      checkInFrom: checkInFrom || undefined,
      checkInTo: checkInTo || undefined,
    }),
    [paginationModel, debouncedSearch, status, checkInFrom, checkInTo]
  )

  return {
    paginationModel,
    setPaginationModel,
    search,
    handleSearch,
    status,
    handleStatusChange,
    checkInFrom,
    setCheckInFrom,
    checkInTo,
    setCheckInTo,
    queryParams,
  }
}
