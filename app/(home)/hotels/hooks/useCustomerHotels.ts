'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import {
  DEFAULT_CUSTOMER_HOTELS_PAGE_SIZE,
  DEFAULT_CUSTOMER_HOTELS_SEARCH_DEBOUNCE_MS,
  DEFAULT_HOTEL_FILTERS,
} from '../constants/hotelFilters'
import type { CustomerHotelFilters } from '../types/customerHotel'
import { getCustomerHotels } from '../client/hotelClient'

export const customerHotelQueryKeys = {
  all: ['customer-hotels'] as const,
}

export const useCustomerHotels = () => {
  const [filters, setFilters] = useState<CustomerHotelFilters>(DEFAULT_HOTEL_FILTERS)
  const [page, setPage] = useState(1)

  const [debouncedQuery] = useDebounce(
    filters.query,
    DEFAULT_CUSTOMER_HOTELS_SEARCH_DEBOUNCE_MS
  )

  const params = {
    search: debouncedQuery || undefined,
    location: filters.destination !== 'all' ? filters.destination : undefined,
    pageNumber: page,
    pageSize: DEFAULT_CUSTOMER_HOTELS_PAGE_SIZE,
  }

  const query = useQuery({
    queryKey: [...customerHotelQueryKeys.all, params],
    queryFn: ({ signal }) => getCustomerHotels(params, signal),
    placeholderData: prev => prev,
  })

  const hotels = query.data?.items ?? []

  const updateFilters = <TKey extends keyof CustomerHotelFilters>(
    key: TKey,
    value: CustomerHotelFilters[TKey]
  ) => {
    setFilters(current => ({ ...current, [key]: value }))
    setPage(1)
  }

  const handlePageChange = (_: unknown, newPage: number) => setPage(newPage)

  return {
    hotels,
    filteredHotels: hotels,
    destinationOptions: [],
    filters,
    updateFilters,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    page,
    totalPages: query.data?.totalPages ?? 1,
    handlePageChange,
  }
}
