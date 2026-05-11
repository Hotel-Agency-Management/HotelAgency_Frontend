import { useQuery } from '@tanstack/react-query'
import { getHotels, getHotelById } from '../../clients/hotelClient'
import { HotelListParams } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { useAuth } from '@/core/context/AuthContext'

export const hotelQueryKeys = {
  lists: (agencyId?: number) => ['hotels', agencyId] as const,
  list: (agencyId?: number, params?: HotelListParams) => ['hotels', agencyId, params] as const,
  detail: (agencyId?: number, hotelId?: number) => ['hotel', agencyId, hotelId] as const,
}

export const useGetHotels = (params?: HotelListParams) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: hotelQueryKeys.list(user?.agencyId, params),
    queryFn: ({ signal }) => getHotels(params, signal),
    enabled: !!user,
    select: (data): { items: Hotel[]; pageNumber: number; pageSize: number; totalCount: number; totalPages: number } => ({
      ...data,
      items: data.items.map(mapHotelResponseToHotel),
    }),
  })
}

export const useGetHotelById = (hotelId?: number) => {
  const { user } = useAuth()

  return useQuery({
    queryKey: hotelQueryKeys.detail(user?.agencyId, hotelId),
    queryFn: () => getHotelById(hotelId as number),
    enabled: !!user && Number.isFinite(hotelId),
    select: mapHotelResponseToHotel,
  })
}
