import type { BedType, RoomPhoto, RoomStatus } from "../../types/room";
import type { RoomKind } from "../../../../../../room-types/constants/roomTypes";

/** Room payload for profile UI (display-oriented `type` key vs API `roomTypeId`). */
export interface RoomProfile {
  id: string;
  roomNumber: string;
  floorNumber: number;
  type: RoomKind;
  status: RoomStatus;
  description?: string;
  notes?: string;
  capacity: number;
  bedType: BedType;
  starRating: number;
  amenities: string[];
  photos: RoomPhoto[];
  pricePerNight?: number;
  extendPrice?: number;
}
