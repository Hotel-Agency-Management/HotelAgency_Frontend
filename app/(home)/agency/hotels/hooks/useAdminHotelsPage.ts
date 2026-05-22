'use client'

import { useRouter } from 'next/navigation'
import { usePaginatedSearch } from '@/core/hooks/usePaginatedSearch'
import { DEFAULT_HOTELS_PAGE_SIZE } from '../constants/hotel'
import { useAdminGetHotels } from './queries/useAdminHotelQueries'

export function useAdminHotelsPage(agencyId: number) {
  const router = useRouter()

  const { search, page, params, handleSearch, handlePageChange } = usePaginatedSearch({
    pageSize: DEFAULT_HOTELS_PAGE_SIZE,
  })
  const { data: hotelData } = useAdminGetHotels(agencyId, params)
  const hotels = hotelData?.items ?? []
  const totalPages = hotelData?.totalPages ?? 1

  return {
    hotels,
    handleAdd: () => router.push(`/agencies/${agencyId}/hotels/addHotel`),
    handleUpdate: (id: string) => router.push(`/agencies/${agencyId}/hotels/${id}/edit`),
    handleOpen: (id: string) => router.push(`/agencies/${agencyId}/hotels/${id}/rooms`),
    search,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
  }
}
