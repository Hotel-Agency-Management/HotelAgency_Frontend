import { useState } from 'react'
import { useDeleteRoomType } from './mutations/roomTypeMutations'
import type { RoomType } from '../types/roomType'

export function useRoomTypeDeleteDialog() {
  const [deletingRoomType, setDeletingRoomType] = useState<RoomType | null>(null)

  const { mutateAsync: deleteRoomType, isPending: isDeleting } = useDeleteRoomType()

  const openDelete = (roomType: RoomType) => {
    setDeletingRoomType(roomType)
  }

  const closeDelete = () => {
    setDeletingRoomType(null)
  }

  const confirmDelete = async () => {
    if (!deletingRoomType) return
    await deleteRoomType(deletingRoomType.id)
    closeDelete()
  }

  return {
    deletingRoomType,
    isDeleting,
    openDelete,
    closeDelete,
    confirmDelete,
  }
}
