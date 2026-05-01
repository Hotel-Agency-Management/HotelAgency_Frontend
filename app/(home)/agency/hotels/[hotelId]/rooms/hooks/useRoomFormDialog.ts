import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminCreateRoom, useAdminUpdateRoom } from "./mutations/adminRoomMutations";
import { useCreateRoom, useUpdateRoom } from "./mutations/roomMutations";
import { useAdminRoomById, useAdminRoomPhotos } from "./queries/adminRoomQueries";
import { useRoomById, useRoomPhotos } from "./queries/roomQueries";
import { adminDeleteRoomPhoto, adminUploadRoomPhoto } from "../clients/adminRoomPhotoClient";
import { deleteRoomPhoto, uploadRoomPhoto } from "../clients/roomPhotoClient";
import { resolveRoomImage } from "@/lib/image-url";
import { RoomFormValues, roomSchema } from "../schema/roomSchema";
import { useGetRoomTypes } from "../../../../../room-types/hooks/queries/roomTypeQueries";
import type { RoomPhoto, RoomResponse, RoomRouteScope } from "../types/room";
import { defaultFormValues } from "../constants/roomFormValues";
import { ADMIN_ROOM_QUERY_KEYS, ROOM_QUERY_KEYS } from "../constants/roomKey";

export interface UseRoomFormDialogArgs {
  open: boolean;
  onClose: () => void;
  roomId: number | null;
  scope: RoomRouteScope;
}

function getRoomValues(room: RoomResponse): RoomFormValues {
  return {
    roomTypeId: room.roomTypeId,
    roomNumber: room.roomNumber,
    floorNumber: room.floorNumber,
    description: room.description ?? "",
    status: room.status,
    notes: room.notes ?? "",
    amenityIds: room.amenities.map((amenity) => amenity.id),
    dailyPrice: room.dailyPrice,
    weeklyPrice: room.weeklyPrice,
    monthlyPrice: room.monthlyPrice,
    extendPrice: room.extendPrice,
    capacity: room.capacity,
    coverPhoto: null,
  };
}

export function useRoomFormDialog({
  open,
  onClose,
  roomId,
  scope,
}: UseRoomFormDialogArgs) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const isEdit = roomId != null;
  const { data: roomTypes = [] } = useGetRoomTypes();
  const [activeStep, setActiveStep] = useState(0);
  const [createPhotos, setCreatePhotos] = useState<File[]>([]);
  const [replacementCoverPhoto, setReplacementCoverPhoto] = useState<File | null>(null);
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<number[]>([]);
  const [isSavingPhotos, setIsSavingPhotos] = useState(false);

  const agencyRoom = useRoomById(scope.mode === "agency" && isEdit ? scope.hotelId : undefined, roomId ?? undefined);
  const adminRoom = useAdminRoomById(
    scope.mode === "admin" && isEdit ? scope.agencyId : undefined,
    scope.mode === "admin" && isEdit ? scope.hotelId : undefined,
    roomId ?? undefined,
  );
  const agencyPhotos = useRoomPhotos(scope.mode === "agency" && isEdit ? scope.hotelId : undefined, roomId ?? undefined);
  const adminPhotos = useAdminRoomPhotos(
    scope.mode === "admin" && isEdit ? scope.agencyId : undefined,
    scope.mode === "admin" && isEdit ? scope.hotelId : undefined,
    roomId ?? undefined,
  );

  const agencyCreateRoom = useCreateRoom(scope.mode === "agency" ? scope.hotelId : undefined);
  const adminCreateRoom = useAdminCreateRoom(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
  );
  const agencyUpdateRoom = useUpdateRoom(scope.mode === "agency" ? scope.hotelId : undefined, roomId ?? undefined);
  const adminUpdateRoom = useAdminUpdateRoom(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    roomId ?? undefined,
  );

  const roomQuery = scope.mode === "admin" ? adminRoom : agencyRoom;
  const photosQuery = scope.mode === "admin" ? adminPhotos : agencyPhotos;
  const createMutation = scope.mode === "admin" ? adminCreateRoom : agencyCreateRoom;
  const updateMutation = scope.mode === "admin" ? adminUpdateRoom : agencyUpdateRoom;

  const methods = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    defaultValues: defaultFormValues,
  });

  const { reset, handleSubmit } = methods;

  const isSaving = createMutation.isPending || updateMutation.isPending || isSavingPhotos;
  const room = roomQuery.data ?? null;

  useEffect(() => {
    if (!open) return;
    reset(room ? getRoomValues(room) : defaultFormValues);
    if (!room) {
      setActiveStep(0);
      setCreatePhotos([]);
      setReplacementCoverPhoto(null);
      setDeletedPhotoIds([]);
    }
  }, [open, reset, room]);

  const resetAndClose = useCallback(() => {
    reset(defaultFormValues);
    setActiveStep(0);
    setCreatePhotos([]);
    setReplacementCoverPhoto(null);
    setDeletedPhotoIds([]);
    onClose();
  }, [onClose, reset]);

  const handleClose = () => {
    if (isSaving) return;
    resetAndClose();
  };

  const onSubmit = handleSubmit(() => {
    if (isEdit) {
      setActiveStep(1);
      return;
    }

    setActiveStep(1);
  });

  const handleCreateNext = handleSubmit(() => {
    setActiveStep(1);
  });

  const uploadAdditionalPhotos = async (createdRoomId: number, photos: File[]) => {
    const additionalPhotos = photos.slice(1);
    if (!additionalPhotos.length) return;

    if (scope.mode === "admin") {
      await Promise.all(
        additionalPhotos.map((file) =>
          adminUploadRoomPhoto(scope.agencyId, scope.hotelId, createdRoomId, file),
        ),
      );
      return;
    }

    await Promise.all(
      additionalPhotos.map((file) => uploadRoomPhoto(scope.hotelId, createdRoomId, file)),
    );
  };

  const uploadPhotos = async (targetRoomId: number, photos: File[]) => {
    if (!photos.length) return;

    if (scope.mode === "admin") {
      await Promise.all(
        photos.map((file) =>
          adminUploadRoomPhoto(scope.agencyId, scope.hotelId, targetRoomId, file),
        ),
      );
      return;
    }

    await Promise.all(
      photos.map((file) => uploadRoomPhoto(scope.hotelId, targetRoomId, file)),
    );
  };

  const deletePhotos = async (targetRoomId: number, photoIds: number[]) => {
    if (!photoIds.length) return;

    if (scope.mode === "admin") {
      await Promise.all(
        photoIds.map((photoId) =>
          adminDeleteRoomPhoto(scope.agencyId, scope.hotelId, targetRoomId, photoId),
        ),
      );
      return;
    }

    await Promise.all(
      photoIds.map((photoId) => deleteRoomPhoto(scope.hotelId, targetRoomId, photoId)),
    );
  };

  const refetchRoomsList = async () => {
    const queryKey =
      scope.mode === "admin"
        ? ADMIN_ROOM_QUERY_KEYS.roomsByHotel(scope.agencyId, scope.hotelId)
        : ROOM_QUERY_KEYS.roomsByHotel(scope.hotelId);

    await queryClient.invalidateQueries({ queryKey });
    await queryClient.refetchQueries({ queryKey, type: "active" });
  };

  const handleFinishCreate = handleSubmit(async (values) => {
    setIsSavingPhotos(true);
    try {
      const createdRoom = await createMutation.mutateAsync({
        ...values,
        coverPhoto: createPhotos[0] ?? null,
      });
      await uploadAdditionalPhotos(createdRoom.id, createPhotos);
      await refetchRoomsList();
      resetAndClose();
    } finally {
      setIsSavingPhotos(false);
    }
  });

  const handleFinishEdit = handleSubmit(async (values) => {
    if (roomId == null) return;

    setIsSavingPhotos(true);
    try {
      await updateMutation.mutateAsync({
        ...values,
        coverPhoto: replacementCoverPhoto ?? values.coverPhoto ?? null,
      });
      await deletePhotos(roomId, deletedPhotoIds);
      await uploadPhotos(roomId, createPhotos);
      await refetchRoomsList();
      await photosQuery.refetch();
      resetAndClose();
    } finally {
      setIsSavingPhotos(false);
    }
  });

  const titleRoom = useMemo(() => room ?? null, [room]);
  const existingPhotos = useMemo<RoomPhoto[]>(() => {
    const gallery = (photosQuery.data ?? [])
      .filter((photo) => !deletedPhotoIds.includes(photo.id))
      .map((photo) => ({
        id: photo.id,
        url: resolveRoomImage(photo.photoUrl),
      }));

    if (!room?.coverPhotoUrl) return gallery;

    const coverUrl = resolveRoomImage(room.coverPhotoUrl);
    const galleryHasCover = gallery.some((photo) => photo.url === coverUrl);

    if (galleryHasCover) {
      return gallery.map((photo) =>
        photo.url === coverUrl ? { ...photo, isPrimary: true, isCoverPhoto: true } : photo,
      );
    }

    return [
      {
        id: `cover-${room.id}`,
        url: coverUrl,
        isPrimary: true,
        isCoverPhoto: true,
      },
      ...gallery,
    ];
  }, [deletedPhotoIds, photosQuery.data, room]);

  const handleDeleteExistingPhoto = (photo: RoomPhoto) => {
    const photoId = Number(photo.id);
    if (!Number.isFinite(photoId)) return;

    setDeletedPhotoIds((current) =>
      current.includes(photoId) ? current : [...current, photoId],
    );
  };

  return {
    methods,
    roomTypes,
    isEdit,
    room: titleRoom,
    isLoadingRoom: isEdit && roomQuery.isLoading,
    isSaving,
    isSavingPhotos,
    activeStep,
    setActiveStep,
    createPhotos,
    setCreatePhotos,
    replacementCoverPhoto,
    setReplacementCoverPhoto,
    existingPhotos,
    handleDeleteExistingPhoto,
    handleClose,
    onSubmit,
    handleCreateNext,
    handleFinishCreate,
    handleFinishEdit,
    stepLabels: [
      t("hotelRooms.dialog.stepDetails", { defaultValue: "Room details" }),
      t("hotelRooms.dialog.stepPhotos", { defaultValue: "Photos" }),
    ],
    t,
  };
}
