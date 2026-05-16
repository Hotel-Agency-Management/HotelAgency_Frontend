'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { UsePaginatedSearchOptions, UsePaginatedSearchResult } from '../configs/searchPaginationConfig'

export function usePaginatedSearch({
  pageSize = 10,
  debounceMs = 300,
}: UsePaginatedSearchOptions = {}): UsePaginatedSearchResult {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(1)

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value || undefined)
    setPage(1)
  }, debounceMs)

  const handleSearch = (value: string) => {
    setSearchInput(value)
    debouncedSetSearch(value)
  }

  const handlePageChange = (_: unknown, newPage: number) => setPage(newPage)

  return {
    search: searchInput,
    page,
    params: {
      search: debouncedSearch,
      pageNumber: page,
      pageSize,
    },
    handleSearch,
    handlePageChange,
  }
}
