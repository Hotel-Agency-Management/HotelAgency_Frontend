import { useQuery } from '@tanstack/react-query'
import { getHotels, getHotelById } from '../../clients/hotelClient'
import { HotelResponse } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { useAuth } from '@/core/context/AuthContext'

export const hotelQueryKeys = {
  list: (agencyId?: number) => ['hotels', agencyId] as const,
  detail: (agencyId?: number, hotelId?: number) => ['hotel', agencyId, hotelId] as const,
}

export const useGetHotels = () => {
  const { user } = useAuth()

  return useQuery<HotelResponse[], unknown, Hotel[]>({
    queryKey: hotelQueryKeys.list(),
    queryFn: () => getHotels(),
    enabled: !!user,
    select: hotels => hotels.map(mapHotelResponseToHotel)
  })
}

export const useGetHotelById = (hotelId?: number) => {
  const { user } = useAuth()

  return useQuery<HotelResponse, unknown, Hotel>({
    queryKey: hotelQueryKeys.detail(hotelId),
    queryFn: () => getHotelById(hotelId as number),
    enabled: !!user && Number.isFinite(hotelId),
    select: mapHotelResponseToHotel
  })
}
