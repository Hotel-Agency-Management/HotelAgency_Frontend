'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { mapPublicRoomToProfile } from '../utils/mapPublicRoomToProfile'
import { getCustomerHotelById, getCustomerHotelRoomById } from '../data/customerHotelRooms'
import { getPublicRoomTypeName } from '../utils/publicRoomFields'

export const customerRoomProfileQueryKeys = {
  hotel: (hotelId: string) => ['customer-hotel', hotelId] as const,
  room: (hotelId: string, roomId: string) => ['customer-hotel-room', hotelId, roomId] as const,
}

export const useCustomerRoomProfile = (hotelId: string, roomId: string) => {
  const hotelQuery = useQuery({
    queryKey: customerRoomProfileQueryKeys.hotel(hotelId),
    queryFn: () => getCustomerHotelById(hotelId),
    enabled: hotelId.length > 0,
  })

  const roomQuery = useQuery({
    queryKey: customerRoomProfileQueryKeys.room(hotelId, roomId),
    queryFn: () => getCustomerHotelRoomById(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

  const profile = useMemo(() => {
    const room = roomQuery.data
    if (!room) return null

    const typeName = getPublicRoomTypeName(room)
    return mapPublicRoomToProfile(room, typeName)
  }, [roomQuery.data])

  return {
    hotel: hotelQuery.data ?? null,
    room: roomQuery.data ?? null,
    profile,
    isLoading: hotelQuery.isLoading || roomQuery.isLoading,
    isError: hotelQuery.isError || roomQuery.isError,
  }
}
