import { useMemo, useState } from "react";
import {
  useCreateRoomAmenity,
  useDeleteRoomAmenity,
  useRoomAmenities,
  useUpdateRoomAmenity,
} from "./useRoomAmenityStore";
import type { RoomAmenity, RoomAmenityFilters } from "../types/roomAmenity";
import type { RoomAmenityFormValues } from "../schema/roomAmenitySchema";

export function useRoomAmenitiesPage() {
  const [filters, setFilters] = useState<RoomAmenityFilters>({});
  const [formOpen, setFormOpen] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<RoomAmenity | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const { data: amenities = [], isLoading, error } = useRoomAmenities(filters);
  const { mutateAsync: createAmenity, isPending: isCreating } = useCreateRoomAmenity();
  const { mutateAsync: updateAmenity, isPending: isUpdating } = useUpdateRoomAmenity();
  const { mutateAsync: deleteAmenity, isPending: isDeleting } = useDeleteRoomAmenity();

  const deleteTarget = useMemo(
    () => amenities.find((a) => a.id === deleteTargetId) ?? null,
    [amenities, deleteTargetId]
  );

  const handleOpenCreate = () => {
    setEditingAmenity(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (amenity: RoomAmenity) => {
    setEditingAmenity(amenity);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAmenity(null);
  };

  const handleSaveDetails = async (values: RoomAmenityFormValues, id?: string) => {
    if (id) return updateAmenity({ id, dto: values });
    return createAmenity(values);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    await deleteAmenity(deleteTargetId);
    setDeleteTargetId(null);
  };

  return {
    filters,
    formOpen,
    editingAmenity,
    deleteTargetId,
    deleteTarget,
    amenities,
    isLoading,
    error,
    isCreating,
    isUpdating,
    isDeleting,
    setFilters,
    setDeleteTargetId,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseForm,
    handleSaveDetails,
    handleConfirmDelete,
  };
}
