import { useMemo, useState } from 'react'
import {
  useAdminRoomAmenities,
  useCreateRoomAmenity,
  useDeleteRoomAmenity,
} from './useRoomAmenityStore'
import type { RoomAmenityFilters } from '../types/roomAmenity'
import type { RoomAmenityFormValues } from '../schema/roomAmenitySchema'

export function useRoomAmenitiesPage() {
  const [filters, setFilters] = useState<RoomAmenityFilters>({})
  const [formOpen, setFormOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)

  const { data: amenities = [], isLoading, error } = useAdminRoomAmenities(filters)
  const { mutateAsync: createAmenity, isPending: isCreating } = useCreateRoomAmenity()
  const { mutateAsync: deleteAmenity, isPending: isDeleting } = useDeleteRoomAmenity()

  const deleteTarget = useMemo(
    () => amenities.find((a) => a.id === deleteTargetId) ?? null,
    [amenities, deleteTargetId]
  )

  const handleOpenCreate = () => {
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
  }

  const handleSaveDetails = async (values: RoomAmenityFormValues) => {
    await createAmenity(values)
  }

  const handleConfirmDelete = async () => {
    if (deleteTargetId == null) return
    await deleteAmenity(deleteTargetId)
    setDeleteTargetId(null)
  }

  return {
    filters,
    formOpen,
    deleteTargetId,
    deleteTarget,
    amenities,
    isLoading,
    error,
    isCreating,
    isDeleting,
    setFilters,
    setDeleteTargetId,
    handleOpenCreate,
    handleCloseForm,
    handleSaveDetails,
    handleConfirmDelete,
  }
}
