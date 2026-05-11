import type { BedType, LegacyRoomStatus, RoomAmenityResponse, RoomPhoto } from "../../types/room";
import type { RoomKind } from "../../../../../../room-types/constants/roomTypes";

export interface RoomProfile {
  id: string;
  roomNumber: string;
  roomTypeName?: string;
  floorNumber: number;
  type: RoomKind;
  status: LegacyRoomStatus;
  description?: string;
  notes?: string;
  capacity: number;
  bedType: BedType;
  starRating: number;
  amenities: Array<string | RoomAmenityResponse>;
  photos: RoomPhoto[];
  pricePerNight?: number;
  extendPrice?: number;
  insurance?: number;
}
