'use client'

import { useRouter } from 'next/navigation'
import { usePaginatedSearch } from '@/core/hooks/usePaginatedSearch'
import { DEFAULT_HOTELS_PAGE_SIZE } from '../constants/hotel'
import { useGetHotels } from './queries/useHotelQueries'

export function useHotelsPage() {
  const router = useRouter()

  const { search, page, params, handleSearch, handlePageChange } = usePaginatedSearch({
    pageSize: DEFAULT_HOTELS_PAGE_SIZE,
  })
  const { data: hotelData } = useGetHotels(params)
  const hotels = hotelData?.items ?? []
  const totalPages = hotelData?.totalPages ?? 1

  return {
    hotels,
    handleUpdate: (id: string) => router.push(`/agency/hotels/${id}/edit`),
    handleOpen: (id: string) => router.push(`/agency/hotels/${id}/rooms`),
    search,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
  }
}
