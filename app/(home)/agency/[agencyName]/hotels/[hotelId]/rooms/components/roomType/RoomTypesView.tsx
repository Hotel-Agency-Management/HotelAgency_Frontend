'use client'

import { useState } from 'react'
import { Alert, Stack } from '@mui/material'
import { RoomTypeFormDialog } from './RoomTypeFormDialog'
import { DeleteRoomTypeDialog } from './DeleteRoomTypeDialog'
import { RoomTypesEmptyState } from './RoomTypesEmptyState'
import { RoomTypesHeader } from './RoomTypesHeader'
import { RoomTypesLoadingGrid } from './RoomTypesLoadingGrid'

import { RoomTypeFormValues } from '../../schema/roomTypeSchema'
import { RoomType } from '../../types/roomType'
import { RoomTypesGrid } from './RoomTypesGrid'
import { useHotelStore } from '../../../../hooks/useHotelStore'
import { useRoomTypes, useCreateRoomType, useUpdateRoomType, useDeleteRoomType } from '../../hooks/uesRoomType'
interface RoomTypesViewProps {
  hotelId: string
}

export function RoomTypesView({ hotelId }: RoomTypesViewProps) {
  const hotel = useHotelStore(state => state.getHotelById(hotelId))
  const currency = hotel?.basicInfo.currency ?? 'USD'

  const { data: roomTypes = [], isLoading, error } = useRoomTypes(hotelId)
  const { mutateAsync: createRoomType } = useCreateRoomType()
  const { mutateAsync: updateRoomType } = useUpdateRoomType()
  const { mutateAsync: deleteRoomType } = useDeleteRoomType(hotelId)

  const [formOpen, setFormOpen] = useState(false)
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null)
  const [deletingRoomType, setDeletingRoomType] = useState<RoomType | null>(null)

  const handleOpenAdd = () => {
    setEditingRoomType(null)
    setFormOpen(true)
  }

  const handleOpenEdit = (roomType: RoomType) => {
    setEditingRoomType(roomType)
    setFormOpen(true)
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingRoomType(null)
  }

  const handleSubmit = async (values: RoomTypeFormValues) => {
    if (editingRoomType) {
      await updateRoomType({
        id: editingRoomType.id,
        ...values,
      })
    } else {
      await createRoomType({
        hotelId,
        ...values,
      })
    }

    handleCloseForm()
  }

  const handleOpenDelete = (roomType: RoomType) => {
    setDeletingRoomType(roomType)
  }

  const handleCloseDelete = () => {
    setDeletingRoomType(null)
  }

  const handleConfirmDelete = async () => {
    if (!deletingRoomType) return

    await deleteRoomType(deletingRoomType.id)
    handleCloseDelete()
  }

  return (
    <Stack gap={3}>
      <RoomTypesHeader
        count={roomTypes.length}
        isLoading={isLoading}
        onAdd={handleOpenAdd}
      />

      {error && (
        <Alert severity='error'>
          Failed to load room types
        </Alert>
      )}

      {isLoading && <RoomTypesLoadingGrid />}

      {!isLoading && !error && roomTypes.length === 0 && <RoomTypesEmptyState />}

      {!isLoading && roomTypes.length > 0 && (
        <RoomTypesGrid
          roomTypes={roomTypes}
          currency={currency}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      <RoomTypeFormDialog
        currency={currency}
        open={formOpen}
        editingRoomType={editingRoomType}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
      />

      <DeleteRoomTypeDialog
        open={!!deletingRoomType}
        roomType={deletingRoomType}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </Stack>
  )
}
