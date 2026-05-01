import type { RoomRouteScope } from "../types/room";

export function getRoomsListPath(scope: RoomRouteScope): string {
  if (scope.mode === "admin") {
    return `/agencies/${scope.agencyId}/hotels/${scope.hotelId}/rooms`;
  }

  return `/agency/hotels/${scope.hotelId}/rooms`;
}

export function getRoomProfilePath(scope: RoomRouteScope, roomId: number): string {
  return `${getRoomsListPath(scope)}/${roomId}`;
}
