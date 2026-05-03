import type { BedType, LegacyRoomStatus, RoomPhoto } from "../../types/room";
import type { RoomKind } from "../../../../../../room-types/constants/roomTypes";

export interface RoomProfile {
  id: string;
  roomNumber: string;
  floorNumber: number;
  type: RoomKind;
  status: LegacyRoomStatus;
  description?: string;
  notes?: string;
  capacity: number;
  bedType: BedType;
  starRating: number;
  amenities: string[];
  photos: RoomPhoto[];
  pricePerNight?: number;
  extendPrice?: number;
  insurance?: number;
}
