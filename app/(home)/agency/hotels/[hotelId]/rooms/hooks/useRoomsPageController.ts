"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useAdminDeleteRoom } from "./mutations/adminRoomMutations";
import { useDeleteRoom } from "./mutations/roomMutations";
import { useAdminRoomsByHotel } from "./queries/adminRoomQueries";
import { useRoomsByHotel } from "./queries/roomQueries";
import type { RoomFilters, RoomListItemResponse, RoomRouteScope } from "../types/room";
import type { RoomListParams } from "../configs/roomConfig";
import { getRoomProfilePath } from "../util/roomRoutes";

function matchesFilters(room: RoomListItemResponse, filters: RoomFilters) {
  if (filters.status && room.status !== filters.status) return false;
  if (filters.floor != null && room.floorNumber !== filters.floor) return false;
  return true;
}

export function useRoomsPageController(scope: RoomRouteScope) {
  const router = useRouter();
  const [filters, setFilters] = useState<RoomFilters>({});
  const [view, setView] = useState<"list" | "cards">("list");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [debouncedSearch] = useDebounce(filters.search, 300);

  useEffect(() => {
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [debouncedSearch]);

  const serverParams: RoomListParams = {
    searchText: debouncedSearch || undefined,
    pageNumber: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
  };

  const agencyRooms = useRoomsByHotel(scope.mode === "agency" ? scope.hotelId : undefined, serverParams);
  const adminRooms = useAdminRoomsByHotel(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    serverParams,
  );

  const agencyDeleteRoom = useDeleteRoom(scope.mode === "agency" ? scope.hotelId : undefined);
  const adminDeleteRoom = useAdminDeleteRoom(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
  );

  const roomsQuery = scope.mode === "admin" ? adminRooms : agencyRooms;
  const deleteMutation = scope.mode === "admin" ? adminDeleteRoom : agencyDeleteRoom;

  const rooms = useMemo(
    () => (roomsQuery.data?.items ?? []).filter((room) => matchesFilters(room, filters)),
    [roomsQuery.data, filters],
  );

  const deleteRoom = (roomId: number, options?: { onSuccess?: () => void }) => {
    deleteMutation.mutate(roomId, options);
  };

  const goToRoomProfile = (roomId: number) => {
    router.push(getRoomProfilePath(scope, roomId));
  };

  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPaginationModel(model);
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
    totalCount: roomsQuery.data?.totalCount ?? 0,
    paginationModel,
    handlePaginationModelChange,
  };
}
