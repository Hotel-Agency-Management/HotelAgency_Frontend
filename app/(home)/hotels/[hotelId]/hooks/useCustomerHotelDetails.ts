'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGetRoomTypes } from '@/app/(home)/room-types/hooks/queries/roomTypeQueries'
import { getCustomerHotelById } from '../data/customerHotelRooms'
import { customerHotelRoomsQueryKeys, useCustomerHotelRooms } from './useCustomerHotelRooms'
import {
  DEFAULT_CUSTOMER_ROOM_SEARCH_FILTERS,
  filterCustomerRooms,
} from '../utils/customerRoomFilters'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'

export const customerHotelDetailsQueryKeys = {
  hotel: (hotelId: string) => ['customer-hotel', hotelId] as const,
  rooms: customerHotelRoomsQueryKeys.rooms,
}

export const useCustomerHotelDetails = (hotelId: string) => {
  const [filters, setFilters] = useState<CustomerRoomSearchFilters>(
    DEFAULT_CUSTOMER_ROOM_SEARCH_FILTERS
  )

  const hotelQuery = useQuery({
    queryKey: customerHotelDetailsQueryKeys.hotel(hotelId),
    queryFn: () => getCustomerHotelById(hotelId),
    enabled: hotelId.length > 0,
  })

  const roomsQuery = useCustomerHotelRooms(hotelId)

  const { data: roomTypes = [], isLoading: roomTypesLoading } = useGetRoomTypes()

  const filteredRooms = useMemo(
    () => filterCustomerRooms(roomsQuery.data ?? [], roomTypes, filters),
    [filters, roomTypes, roomsQuery.data]
  )

  const updateFilters = <TKey extends keyof CustomerRoomSearchFilters>(
    key: TKey,
    value: CustomerRoomSearchFilters[TKey]
  ) => {
    setFilters(current => ({ ...current, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_CUSTOMER_ROOM_SEARCH_FILTERS)
  }

  return {
    hotel: hotelQuery.data ?? null,
    rooms: roomsQuery.data ?? [],
    filteredRooms,
    roomTypes,
    filters,
    updateFilters,
    resetFilters,
    isLoading: hotelQuery.isLoading || roomsQuery.isLoading || roomTypesLoading,
    isRoomsLoading: roomsQuery.isLoading || roomTypesLoading,
    isHotelLoading: hotelQuery.isLoading,
    isError: hotelQuery.isError || roomsQuery.isError,
  }
}
