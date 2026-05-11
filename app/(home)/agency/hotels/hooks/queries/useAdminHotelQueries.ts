import { useQuery } from '@tanstack/react-query'
import { adminGetHotels, adminGetHotelById } from '../../clients/adminHotelClient'
import { HotelListParams } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'

export const adminHotelQueryKeys = {
  lists: (agencyId?: number) => ['admin-hotels', agencyId] as const,
  list: (agencyId?: number, params?: HotelListParams) => ['admin-hotels', agencyId, params] as const,
  detail: (agencyId?: number, hotelId?: number) => ['admin-hotel', agencyId, hotelId] as const,
}

export const useAdminGetHotels = (agencyId?: number, params?: HotelListParams) => {
  return useQuery({
    queryKey: adminHotelQueryKeys.list(agencyId, params),
    queryFn: ({ signal }) => adminGetHotels(agencyId as number, params, signal),
    enabled: Number.isFinite(agencyId),
    select: (data): { items: Hotel[]; pageNumber: number; pageSize: number; totalCount: number; totalPages: number } => ({
      ...data,
      items: data.items.map(mapHotelResponseToHotel),
    }),
  })
}

export const useAdminGetHotelById = (agencyId?: number, hotelId?: number) => {
  return useQuery({
    queryKey: adminHotelQueryKeys.detail(agencyId, hotelId),
    queryFn: () => adminGetHotelById(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
    select: mapHotelResponseToHotel,
  })
}
