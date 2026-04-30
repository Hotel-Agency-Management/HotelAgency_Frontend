import { useState } from 'react'
import { useCreateRoomType, useUpdateRoomType } from './mutations/roomTypeMutations'
import type { RoomType } from '../types/roomType'
import type { RoomTypeFormValues } from '../schema/roomTypeSchema'

export function useRoomTypeFormDialog() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null)

  const { mutateAsync: createRoomType, isPending: isCreating } = useCreateRoomType()
  const { mutateAsync: updateRoomType, isPending: isUpdating } = useUpdateRoomType()

  const openAdd = () => {
    setEditingRoomType(null)
    setFormOpen(true)
  }

  const openEdit = (roomType: RoomType) => {
    setEditingRoomType(roomType)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingRoomType(null)
  }

  const handleSubmit = async (values: RoomTypeFormValues) => {
    if (editingRoomType) {
      await updateRoomType({ id: editingRoomType.id, ...values })
    } else {
      await createRoomType(values)
    }
    closeForm()
  }

  return {
    formOpen,
    editingRoomType,
    isSubmitting: isCreating || isUpdating,
    openAdd,
    openEdit,
    closeForm,
    handleSubmit,
  }
}
