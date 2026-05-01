"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { resolveRoomImage } from "@/lib/image-url";
import { useAdminDeleteRoom } from "./mutations/adminRoomMutations";
import { useDeleteRoom } from "./mutations/roomMutations";
import { useAdminRoomById, useAdminRoomPhotos } from "./queries/adminRoomQueries";
import { useRoomById, useRoomPhotos } from "./queries/roomQueries";
import type { RoomPhoto, RoomRouteScope } from "../types/room";
import { getRoomsListPath } from "../util/roomRoutes";

export function useRoomProfileController(scope: RoomRouteScope, roomId: number) {
  const router = useRouter();
  const roomsListPath = getRoomsListPath(scope);

  const agencyRoom = useRoomById(scope.mode === "agency" ? scope.hotelId : undefined, roomId);
  const adminRoom = useAdminRoomById(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    roomId,
  );
  const agencyPhotos = useRoomPhotos(scope.mode === "agency" ? scope.hotelId : undefined, roomId);
  const adminPhotos = useAdminRoomPhotos(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    roomId,
  );

  const agencyDeleteRoom = useDeleteRoom(scope.mode === "agency" ? scope.hotelId : undefined);
  const adminDeleteRoom = useAdminDeleteRoom(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
  );

  const roomQuery = scope.mode === "admin" ? adminRoom : agencyRoom;
  const photosQuery = scope.mode === "admin" ? adminPhotos : agencyPhotos;
  const deleteMutation = scope.mode === "admin" ? adminDeleteRoom : agencyDeleteRoom;

  const photos = useMemo<RoomPhoto[]>(() => {
    const gallery = (photosQuery.data ?? []).map((photo) => ({
      id: photo.id,
      url: resolveRoomImage(photo.photoUrl),
    }));

    if (!roomQuery.data?.coverPhotoUrl) return gallery;

    return [
      {
        id: -roomQuery.data.id,
        url: resolveRoomImage(roomQuery.data.coverPhotoUrl),
        isPrimary: true,
      },
      ...gallery,
    ];
  }, [photosQuery.data, roomQuery.data]);

  const handleBack = () => router.push(roomsListPath);
  const handleEdit = () => router.push(roomsListPath);
  const handleDelete = () => {
    deleteMutation.mutate(roomId, { onSuccess: () => router.push(roomsListPath) });
  };

  return {
    room: roomQuery.data,
    photos,
    isLoading: roomQuery.isLoading || photosQuery.isLoading,
    isError: roomQuery.isError,
    error: roomQuery.error,
    isDeleting: deleteMutation.isPending,
    handleBack,
    handleEdit,
    handleDelete,
  };
}
