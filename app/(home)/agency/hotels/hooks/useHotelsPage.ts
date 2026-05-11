'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { usePaginatedSearch } from '@/core/hooks/usePaginatedSearch'
import { useHotelStore } from '../hooks/useHotelStore'

export function useHotelsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const agencyId = user?.agencyId

  const { search, page, params, handleSearch, handlePageChange } = usePaginatedSearch({ pageSize: 9 })
  const { hotels, totalPages } = useHotelStore(agencyId, undefined, params)

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
