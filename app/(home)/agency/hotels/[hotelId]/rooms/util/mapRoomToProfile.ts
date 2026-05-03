import type { Room } from "../types/room";
import type { RoomKind } from "../../../../../room-types/constants/roomTypes";
import type { RoomProfile } from "../components/profile/types";
// TODO: inferRoomKindFromTypeName is a temporary workaround — replace once the room-type endpoint returns RoomKind directly
export function inferRoomKindFromTypeName(name: string): RoomKind {
  const normalized = name.toLowerCase();
  if (normalized.includes("penthouse")) return "penthouse";
  if (normalized.includes("presidential") || normalized.includes("suite")) return "suite";
  if (normalized.includes("studio")) return "studio";
  if (normalized.includes("twin")) return "twin";
  if (normalized.includes("deluxe") || normalized.includes("double")) return "double";
  if (normalized.includes("standard") || normalized.includes("single")) return "single";
  return "single";
}

export function mapRoomToProfile(room: Room, roomTypeName: string): RoomProfile {
  return {
    id:            room.id,
    roomNumber:    room.roomNumber,
    floorNumber:   room.floorNumber,
    type:          inferRoomKindFromTypeName(roomTypeName),
    status:        room.status,
    description:   room.description,
    notes:         room.notes,
    capacity:      room.capacity,
    bedType:       room.bedType,
    starRating:    room.starRating,
    amenities:     room.amenities,
    photos:        room.photos,
    pricePerNight: room.pricePerNight,
    extendPrice: room.extendPrice,
  };
}
