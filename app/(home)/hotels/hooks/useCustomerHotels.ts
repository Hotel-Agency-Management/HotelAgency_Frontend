'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_HOTEL_FILTERS } from '../constants/hotelFilters'
import type { CustomerHotelFilters } from '../types/customerHotel'
import { getCustomerHotels } from '../client/hotelClient'

export const customerHotelQueryKeys = {
  all: ['customer-hotels'] as const,
}

export const useCustomerHotels = () => {
  const [filters, setFilters] = useState<CustomerHotelFilters>(DEFAULT_HOTEL_FILTERS)

  const query = useQuery({
    queryKey: customerHotelQueryKeys.all,
    queryFn: () => getCustomerHotels(),
  })

  const hotels = query.data ?? []

  const updateFilters = <TKey extends keyof CustomerHotelFilters>(
    key: TKey,
    value: CustomerHotelFilters[TKey]
  ) => {
    setFilters(current => ({ ...current, [key]: value }))
  }

  return {
    hotels,
    filteredHotels: hotels,
    destinationOptions: [],
    filters,
    updateFilters,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  }
}
