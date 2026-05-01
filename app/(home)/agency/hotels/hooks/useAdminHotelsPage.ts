'use client'

import { useRouter } from 'next/navigation'
import { useAdminHotelStore } from './useAdminHotelStore'

export function useAdminHotelsPage(agencyId: number) {
  const router = useRouter()
  const { hotels } = useAdminHotelStore(agencyId)

  const handleAdd = () => router.push(`/agencies/${agencyId}/hotels/addHotel`)
  const handleUpdate = (id: string) => router.push(`/agencies/${agencyId}/hotels/${id}/edit`)
  const handleOpen = (id: string) => router.push(`/agencies/${agencyId}/hotels/${id}/rooms`)

  return { hotels, handleAdd, handleUpdate, handleOpen }
}
