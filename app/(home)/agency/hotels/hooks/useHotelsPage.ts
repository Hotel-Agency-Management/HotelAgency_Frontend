'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useHotelStore } from '../hooks/useHotelStore'
import { useAuth } from '@/core/context/AuthContext'

export function useHotelsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const agencyId = user?.agencyId
  const { hotels, deleteHotel } = useHotelStore(agencyId)

  const [deletingHotelId, setDeletingHotelId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deletingHotel = useMemo(
    () => hotels.find(hotel => hotel.id === deletingHotelId) ?? null,
    [deletingHotelId, hotels]
  )

  const closeDeleteDialog = () => {
    if (deleteLoading) return
    setDeletingHotelId(null)
  }

  const confirmDeleteHotel = async () => {
    if (!deletingHotelId) return

    setDeleteLoading(true)
    try {
      await deleteHotel(deletingHotelId)
      setDeletingHotelId(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleUpdate = (id: string) => {
    router.push(`/agency/hotels/${id}/edit`)
  }

  return {
    hotels,
    deletingHotel,
    deleteLoading,
    setDeletingHotelId,
    closeDeleteDialog,
    confirmDeleteHotel,
    handleUpdate,
  }
}
