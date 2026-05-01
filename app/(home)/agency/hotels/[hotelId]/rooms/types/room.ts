export {
  RoomStatus,
  type CreateRoomRequest,
  type RoomAmenityResponse,
  type RoomListItemResponse,
  type RoomResponse,
  type UpdateRoomRequest,
} from "../configs/roomConfig";

export type { RoomPhotoResponse } from "../configs/roomPhotoConfig";

export type RoomRouteScope =
  | { mode: "agency"; hotelId: number }
  | { mode: "admin"; agencyId: number; hotelId: number };

export interface RoomFilters {
  status?: import("../configs/roomConfig").RoomStatus;
  roomTypeId?: number;
  floor?: number;
  search?: string;
}

export interface RoomPhoto {
  id: number | string;
  url: string;
  isPrimary?: boolean;
  isCoverPhoto?: boolean;
}

export const ROOM_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  MAINTENANCE: "maintenance",
  RESERVED: "reserved",
  BLOCKED: "blocked",
} as const;

export type LegacyRoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

export const BED_TYPE = {
  SINGLE: "single",
  DOUBLE: "double",
  QUEEN: "queen",
  KING: "king",
} as const;

export type BedType = (typeof BED_TYPE)[keyof typeof BED_TYPE];

export interface Room {
  id: string;
  roomNumber: string;
  floorNumber: number;
  roomTypeId: string;
  status: LegacyRoomStatus;
  description?: string;
  notes?: string;
  capacity: number;
  bedType: BedType;
  starRating: number;
  amenities: string[];
  photos: RoomPhoto[];
  pricePerNight?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomDto
  extends Omit<Room, "id" | "photos" | "createdAt" | "updatedAt"> {}

export interface UpdateRoomDto extends Partial<CreateRoomDto> {}
