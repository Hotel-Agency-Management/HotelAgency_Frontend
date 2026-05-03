import { useQuery } from '@tanstack/react-query'
import { adminGetHotels, adminGetHotelById } from '../../clients/adminHotelClient'
import { HotelResponse } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'

export const adminHotelQueryKeys = {
  list: (agencyId?: number) => ['admin-hotels', agencyId] as const,
  detail: (agencyId?: number, hotelId?: number) => ['admin-hotel', agencyId, hotelId] as const,
}

export const useAdminGetHotels = (agencyId?: number) => {
  return useQuery<HotelResponse[], unknown, Hotel[]>({
    queryKey: adminHotelQueryKeys.list(agencyId),
    queryFn: () => adminGetHotels(agencyId as number),
    enabled: Number.isFinite(agencyId),
    select: hotels => hotels.map(mapHotelResponseToHotel),
  })
}

export const useAdminGetHotelById = (agencyId?: number, hotelId?: number) => {
  return useQuery<HotelResponse, unknown, Hotel>({
    queryKey: adminHotelQueryKeys.detail(agencyId, hotelId),
    queryFn: () => adminGetHotelById(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
    select: mapHotelResponseToHotel,
  })
}
