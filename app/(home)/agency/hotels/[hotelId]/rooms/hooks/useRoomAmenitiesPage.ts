import { useMemo, useState } from "react";
import {
  useCreateRoomAmenity,
  useDeleteRoomAmenity,
  useRoomAmenities,
  useUpdateRoomAmenity,
  useUpdateRoomAmenityPhotos,
} from "./useRoomAmenityStore";
import type { RoomAmenity, RoomAmenityFilters, RoomAmenityPhoto } from "../types/roomAmenity";
import type { RoomAmenityFormValues } from "../schema/roomAmenitySchema";

export function useRoomAmenitiesPage() {
  const [filters, setFilters] = useState<RoomAmenityFilters>({});
  const [formOpen, setFormOpen] = useState(false);
  const [editingAmenity, setEditingAmenity] = useState<RoomAmenity | null>(null);
  const [assigningAmenity, setAssigningAmenity] = useState<RoomAmenity | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "cards">("list");

  const { data: amenities = [], isLoading, error } = useRoomAmenities(filters);
  const { mutateAsync: createAmenity, isPending: isCreating } = useCreateRoomAmenity();
  const { mutateAsync: updateAmenity, isPending: isUpdating } = useUpdateRoomAmenity();
  const { mutateAsync: updateAmenityPhotos, isPending: isSavingPhotos } = useUpdateRoomAmenityPhotos();
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

  const handleOpenAssign = (amenity: RoomAmenity) => {
    setAssigningAmenity(amenity);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAmenity(null);
  };

  const handleSaveDetails = async (values: RoomAmenityFormValues, id?: string) => {
    if (id) return updateAmenity({ id, dto: values });
    return createAmenity(values);
  };

  const handleSavePhotos = async (id: string, photos: RoomAmenityPhoto[]) => {
    await updateAmenityPhotos({ id, photos });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    await deleteAmenity(deleteTargetId);
    setDeleteTargetId(null);
  };

  return {
    filters,
    view,
    formOpen,
    editingAmenity,
    assigningAmenity,
    deleteTargetId,
    deleteTarget,
    amenities,
    isLoading,
    error,
    isCreating,
    isUpdating,
    isSavingPhotos,
    isDeleting,
    setFilters,
    setView,
    setDeleteTargetId,
    setAssigningAmenity,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenAssign,
    handleCloseForm,
    handleSaveDetails,
    handleSavePhotos,
    handleConfirmDelete,
  };
}
