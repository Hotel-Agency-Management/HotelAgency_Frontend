"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminDeleteRoom } from "./mutations/adminRoomMutations";
import { useDeleteRoom } from "./mutations/roomMutations";
import { useAdminRoomsByHotel } from "./queries/adminRoomQueries";
import { useRoomsByHotel } from "./queries/roomQueries";
import type { RoomFilters, RoomListItemResponse, RoomRouteScope } from "../types/room";
import { getRoomProfilePath } from "../util/roomRoutes";

function matchesFilters(room: RoomListItemResponse, filters: RoomFilters) {
  if (filters.status && room.status !== filters.status) return false;
  if (filters.floor != null && room.floorNumber !== filters.floor) return false;
  if (filters.search) {
    const search = filters.search.toLowerCase();
    return (
      room.roomNumber.toLowerCase().includes(search) ||
      room.roomTypeName.toLowerCase().includes(search)
    );
  }

  return true;
}

export function useRoomsPageController(scope: RoomRouteScope) {
  const router = useRouter();
  const [filters, setFilters] = useState<RoomFilters>({});
  const [view, setView] = useState<"list" | "cards">("list");

  const agencyRooms = useRoomsByHotel(scope.mode === "agency" ? scope.hotelId : undefined);
  const adminRooms = useAdminRoomsByHotel(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
  );

  const agencyDeleteRoom = useDeleteRoom(scope.mode === "agency" ? scope.hotelId : undefined);
  const adminDeleteRoom = useAdminDeleteRoom(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
  );

  const roomsQuery = scope.mode === "admin" ? adminRooms : agencyRooms;
  const deleteMutation = scope.mode === "admin" ? adminDeleteRoom : agencyDeleteRoom;

  const rooms = useMemo(
    () => (roomsQuery.data ?? []).filter((room) => matchesFilters(room, filters)),
    [roomsQuery.data, filters],
  );

  const deleteRoom = (roomId: number, options?: { onSuccess?: () => void }) => {
    deleteMutation.mutate(roomId, options);
  };

  const goToRoomProfile = (roomId: number) => {
    router.push(getRoomProfilePath(scope, roomId));
  };

  return {
    rooms,
    filters,
    setFilters,
    view,
    setView,
    isLoading: roomsQuery.isLoading,
    deleteRoom,
    isDeleting: deleteMutation.isPending,
    goToRoomProfile,
  };
}
