'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchAdminHotelsList } from '../../api/adminPaymentLogsApi'

export function useAdminHotelsQuery() {
  return useQuery({
    queryKey: ['admin-hotels-list'],
    queryFn: fetchAdminHotelsList,
    staleTime: 5 * 60 * 1000,
    select: (data) => data.hotels,
  })
}
