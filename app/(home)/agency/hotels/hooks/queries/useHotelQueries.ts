import { useQuery } from '@tanstack/react-query'
import { getHotels, getHotelById } from '../../clients/hotelClient'
import { HotelResponse } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'

export const hotelQueryKeys = {
  list: (agencyId?: number) => ['hotels', agencyId] as const,
  detail: (agencyId?: number, hotelId?: number) => ['hotel', agencyId, hotelId] as const,
}

export const useGetHotels = (agencyId?: number) => {
  return useQuery<HotelResponse[], unknown, Hotel[]>({
    queryKey: hotelQueryKeys.list(agencyId),
    queryFn: () => getHotels(agencyId as number),
    enabled: Number.isFinite(agencyId),
    select: hotels => hotels.map(mapHotelResponseToHotel)
  })
}

export const useGetHotelById = (
  agencyId?: number,
  hotelId?: number
) => {
  return useQuery<HotelResponse, unknown, Hotel>({
    queryKey: hotelQueryKeys.detail(agencyId, hotelId),
    queryFn: () => getHotelById(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
    select: mapHotelResponseToHotel
  })
}
