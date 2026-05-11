'use client'

import { useRouter } from 'next/navigation'
import { usePaginatedSearch } from '@/core/hooks/usePaginatedSearch'
import { useAdminHotelStore } from './useAdminHotelStore'

export function useAdminHotelsPage(agencyId: number) {
  const router = useRouter()

  const { search, page, params, handleSearch, handlePageChange } = usePaginatedSearch({ pageSize: 9 })
  const { hotels, totalPages } = useAdminHotelStore(agencyId, undefined, params)

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
