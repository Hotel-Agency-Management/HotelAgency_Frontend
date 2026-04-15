'use client'
import Container from '@mui/material/Container'
import { DeleteHotelDialog } from './DeleteHotelDialog'
import { HotelGrid } from './HotelGrid'
import { useHotelsPage } from '../hooks/useHotelsPage'

export function HotelsPage() {
  const {
    hotels,
    deletingHotel,
    deleteLoading,
    setDeletingHotelId,
    closeDeleteDialog,
    confirmDeleteHotel,
    handleUpdate,
  } = useHotelsPage()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HotelGrid
        hotels={hotels}
        onDelete={setDeletingHotelId}
        onUpdate={handleUpdate}
      />
      <DeleteHotelDialog
        hotel={deletingHotel}
        loading={deleteLoading}
        open={deletingHotel != null}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteHotel}
      />
    </Container>
  )
}
