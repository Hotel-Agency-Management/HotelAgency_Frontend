"use client";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useRoomAmenitiesPage } from "../../hooks/useRoomAmenitiesPage";
import { AssignRoomAmenityDialog } from "./AssignRoomAmenityDialog";
import { DeleteRoomAmenityDialog } from "./DeleteRoomAmenityDialog";
import { RoomAmenityFormDialog } from "./form/RoomAmenityFormDialog";
import { RoomAmenitiesGrid } from "./list/RoomAmenitiesGrid";
import { RoomAmenitiesTable } from "./list/RoomAmenitiesTable";
import { RoomAmenitiesPageHeader } from "./RoomAmenitiesPageHeader";
import { RoomAmenitiesToolbar } from "./RoomAmenitiesToolbar";

export function RoomAmenitiesPage() {
  const {
    filters, view, formOpen, editingAmenity,
    assigningAmenity, deleteTargetId, deleteTarget, amenities,
    isLoading, error, isCreating, isUpdating, isSavingPhotos, isDeleting,
    setFilters, setView, setDeleteTargetId, setAssigningAmenity,
    handleOpenCreate, handleOpenEdit, handleOpenAssign, handleCloseForm,
    handleSaveDetails, handleSavePhotos, handleConfirmDelete,
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
        view={view}
        onFilterChange={setFilters}
        onViewChange={setView}
      />
      {error ? <Alert severity="error">Failed to load room amenities</Alert> : null}
      {view === "cards" ? (
        <RoomAmenitiesGrid
          amenities={amenities}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={(amenity) => setDeleteTargetId(amenity.id)}
          onAssign={handleOpenAssign}
        />
      ) : (
        <RoomAmenitiesTable
          amenities={amenities}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={(amenity) => setDeleteTargetId(amenity.id)}
          onAssign={handleOpenAssign}
        />
      )}
      <RoomAmenityFormDialog
        open={formOpen}
        amenity={editingAmenity}
        detailsBusy={isCreating || isUpdating}
        photosBusy={isSavingPhotos}
        onClose={handleCloseForm}
        onSaveDetails={handleSaveDetails}
        onSavePhotos={handleSavePhotos}
      />
      <DeleteRoomAmenityDialog
        open={deleteTargetId != null}
        amenity={deleteTarget}
        isDeleting={isDeleting}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />
      <AssignRoomAmenityDialog
        open={assigningAmenity != null}
        amenity={assigningAmenity}
        onClose={() => setAssigningAmenity(null)}
      />
    </Stack>
  );
}
