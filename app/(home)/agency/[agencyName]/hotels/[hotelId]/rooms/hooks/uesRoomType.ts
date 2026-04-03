import { useState, useEffect, useCallback } from 'react'
import { roomTypesApi } from '../api/roomTypeApi'
import { RoomType, CreateRoomTypePayload, UpdateRoomTypePayload } from '../types/roomType'

interface UseRoomTypesReturn {
  roomTypes: RoomType[]
  isLoading: boolean
  error: string | null
  createRoomType: (payload: CreateRoomTypePayload) => Promise<void>
  updateRoomType: (payload: UpdateRoomTypePayload) => Promise<void>
  deleteRoomType: (id: string) => Promise<void>
}

export function useRoomTypes(hotelId: string): UseRoomTypesReturn {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRoomTypes = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await roomTypesApi.getAll(hotelId)
      setRoomTypes(data)
    } catch {
      setError('Failed to load room types')
    } finally {
      setIsLoading(false)
    }
  }, [hotelId])

  useEffect(() => {
    fetchRoomTypes()
  }, [fetchRoomTypes])

  const createRoomType = useCallback(async (payload: CreateRoomTypePayload) => {
    try {
      const newRoomType = await roomTypesApi.create(payload)
      setRoomTypes(prev => [...prev, newRoomType])
    } catch {
      setError('Failed to create room type')
    }
  }, [])

  const updateRoomType = useCallback(async (payload: UpdateRoomTypePayload) => {
    try {
      const updated = await roomTypesApi.update(payload)
      setRoomTypes(prev => prev.map(r => r.id === updated.id ? updated : r))
    } catch {
      setError('Failed to update room type')
    }
  }, [])

  const deleteRoomType = useCallback(async (id: string) => {
    try {
      await roomTypesApi.delete(id)
      setRoomTypes(prev => prev.filter(r => r.id !== id))
    } catch {
      setError('Failed to delete room type')
    }
  }, [])

  return {
    roomTypes,
    isLoading,
    error,
    createRoomType,
    updateRoomType,
    deleteRoomType,
  }
}
