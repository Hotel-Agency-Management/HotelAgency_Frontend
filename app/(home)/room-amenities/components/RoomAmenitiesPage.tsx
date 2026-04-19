"use client";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useRoomAmenitiesPage } from "../hooks/useRoomAmenitiesPage";
import { DeleteRoomAmenityDialog } from "./DeleteRoomAmenityDialog";
import { RoomAmenityFormDialog } from "./form/RoomAmenityFormDialog";
import { RoomAmenitiesCards } from "./list/RoomAmenitiesCards";
import { RoomAmenitiesPageHeader } from "./RoomAmenitiesPageHeader";
import { RoomAmenitiesToolbar } from "./RoomAmenitiesToolbar";

export function RoomAmenitiesPage() {
  const {
    filters, formOpen, editingAmenity,
    deleteTargetId, deleteTarget, amenities,
    isLoading, error, isCreating, isUpdating, isDeleting,
    setFilters, setDeleteTargetId,
    handleOpenCreate, handleOpenEdit, handleCloseForm,
    handleSaveDetails, handleConfirmDelete,
  } = useRoomAmenitiesPage();

  return (
    <Stack spacing={3}>
      <RoomAmenitiesPageHeader
        count={amenities.length}
        isLoading={isLoading}
        onAdd={handleOpenCreate}
      />
      <RoomAmenitiesToolbar
        filters={filters}
        onFilterChange={setFilters}
      />
      {error ? <Alert severity="error">Failed to load room amenities</Alert> : null}
      <RoomAmenitiesCards
        amenities={amenities}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(amenity) => setDeleteTargetId(amenity.id)}
      />
      <RoomAmenityFormDialog
        open={formOpen}
        amenity={editingAmenity}
        isSaving={isCreating || isUpdating}
        onClose={handleCloseForm}
        onSaveDetails={handleSaveDetails}
      />
      <DeleteRoomAmenityDialog
        open={deleteTargetId != null}
        amenity={deleteTarget}
        isDeleting={isDeleting}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
    </Stack>
  );
}
