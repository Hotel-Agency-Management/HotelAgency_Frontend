import type { Room } from "../types/room";
import type { RoomKind } from "../../../../../room-types/constants/roomTypes";
import type { RoomProfile } from "../components/profile/types";

/** Maps API room type name to a display `RoomKind` for profile UI. */
export function inferRoomKindFromTypeName(name: string): RoomKind {
  const n = name.toLowerCase();
  if (n.includes("penthouse")) return "penthouse";
  if (n.includes("presidential") || n.includes("suite")) return "suite";
  if (n.includes("studio")) return "studio";
  if (n.includes("twin")) return "twin";
  if (n.includes("deluxe") || n.includes("double")) return "double";
  if (n.includes("standard") || n.includes("single")) return "single";
  return "single";
}

export function mapRoomToProfile(room: Room, roomTypeName: string): RoomProfile {
  return {
    id: room.id,
    roomNumber: room.roomNumber,
    floorNumber: room.floorNumber,
    type: inferRoomKindFromTypeName(roomTypeName),
    status: room.status,
    description: room.description,
    notes: room.notes,
    capacity: room.capacity,
    bedType: room.bedType,
    starRating: room.starRating,
    amenities: room.amenities,
    photos: room.photos,
    pricePerNight: room.pricePerNight,
    extendPrice: room.extendPrice,
  };
}
