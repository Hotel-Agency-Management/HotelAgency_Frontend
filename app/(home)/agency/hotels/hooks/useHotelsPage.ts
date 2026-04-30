'use client'

import { useRouter } from 'next/navigation'
import { useHotelStore } from '../hooks/useHotelStore'
import { useAuth } from '@/core/context/AuthContext'

export function useHotelsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const agencyId = user?.agencyId
  const { hotels } = useHotelStore(agencyId)

  const handleUpdate = (id: string) => {
    router.push(`/agency/hotels/${id}/edit`)
  }

  return { hotels, handleUpdate }
}
