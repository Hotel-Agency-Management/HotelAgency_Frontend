'use client'

import { Alert, Stack } from '@mui/material'
import { RoomTypeFormDialog } from './RoomTypeFormDialog'
import { DeleteRoomTypeDialog } from './DeleteRoomTypeDialog'
import { RoomTypesEmptyState } from './RoomTypesEmptyState'
import { RoomTypesHeader } from './RoomTypesHeader'
import { RoomTypesLoadingGrid } from './RoomTypesLoadingGrid'
import { RoomTypesGrid } from './RoomTypesGrid'
import { useGetRoomTypes } from '../hooks/queries/roomTypeQueries'
import { useRoomTypeFormDialog } from '../hooks/useRoomTypeFormDialog'
import { useRoomTypeDeleteDialog } from '../hooks/useRoomTypeDeleteDialog'

export function RoomTypesView() {
  const { data: roomTypes = [], isLoading, error } = useGetRoomTypes()
  const form = useRoomTypeFormDialog()
  const deletion = useRoomTypeDeleteDialog()

  return (
    <Stack gap={3}>
      <RoomTypesHeader
        count={roomTypes.length}
        isLoading={isLoading}
        onAdd={form.openAdd}
      />

      {error && (
        <Alert severity='error'>Failed to load room types</Alert>
      )}

      {isLoading && <RoomTypesLoadingGrid />}

      {!isLoading && !error && roomTypes.length === 0 && <RoomTypesEmptyState />}

      {!isLoading && roomTypes.length > 0 && (
        <RoomTypesGrid
          roomTypes={roomTypes}
          onEdit={form.openEdit}
          onDelete={deletion.openDelete}
        />
      )}

      <RoomTypeFormDialog
        open={form.formOpen}
        editingRoomType={form.editingRoomType}
        isLoading={form.isSubmitting}
        onClose={form.closeForm}
        onSubmit={form.handleSubmit}
      />

      <DeleteRoomTypeDialog
        open={!!deletion.deletingRoomType}
        roomType={deletion.deletingRoomType}
        isLoading={deletion.isDeleting}
        onClose={deletion.closeDelete}
        onConfirm={deletion.confirmDelete}
      />
    </Stack>
  )
}
