'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_HOTEL_FILTERS } from '../constants/hotelFilters'
import { getCustomerHotels } from '../data/customerHotelsClient'
import { CUSTOMER_HOTELS_MOCK } from '../data/customerHotelsMock'
import type { CustomerHotelFilters } from '../types/customerHotel'
import { filterCustomerHotels, getHotelDestinationOptions } from '../utils/customerHotelFilters'

export const customerHotelQueryKeys = {
  all: ['customer-hotels'] as const,
}

export const useCustomerHotels = () => {
  const [filters, setFilters] = useState<CustomerHotelFilters>(DEFAULT_HOTEL_FILTERS)

  const query = useQuery({
    queryKey: customerHotelQueryKeys.all,
    queryFn: getCustomerHotels,
    placeholderData: CUSTOMER_HOTELS_MOCK,
  })

  const hotels = query.data ?? CUSTOMER_HOTELS_MOCK

  const destinationOptions = useMemo(() => getHotelDestinationOptions(hotels), [hotels])
  const filteredHotels = useMemo(() => filterCustomerHotels(hotels, filters), [hotels, filters])

  const updateFilters = <TKey extends keyof CustomerHotelFilters>(
    key: TKey,
    value: CustomerHotelFilters[TKey]
  ) => {
    setFilters(current => ({ ...current, [key]: value }))
  }

  return {
    hotels,
    filteredHotels,
    destinationOptions,
    filters,
    updateFilters,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  }
}
