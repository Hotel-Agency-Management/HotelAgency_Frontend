export const ROOM_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  MAINTENANCE: "maintenance",
  RESERVED: "reserved",
  BLOCKED: "blocked",
} as const;

export const ROOM_STATUS_VALUES = [
  ROOM_STATUS.AVAILABLE,
  ROOM_STATUS.OCCUPIED,
  ROOM_STATUS.MAINTENANCE,
  ROOM_STATUS.RESERVED,
  ROOM_STATUS.BLOCKED,
] as const;

export type RoomStatus = (typeof ROOM_STATUS_VALUES)[number];

export const BED_TYPE = {
  SINGLE: "single",
  DOUBLE: "double",
  QUEEN: "queen",
  KING: "king",
} as const;

export const BED_TYPE_VALUES = [
  BED_TYPE.SINGLE,
  BED_TYPE.DOUBLE,
  BED_TYPE.QUEEN,
  BED_TYPE.KING,
] as const;

export type BedType = (typeof BED_TYPE_VALUES)[number]


export interface RoomPhoto {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface Room {
  id: string;
  roomNumber: string;
  floorNumber: number;
  roomTypeId: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomDto
  extends Omit<Room, "id" | "photos" | "createdAt" | "updatedAt"> {}

export interface UpdateRoomDto extends Partial<CreateRoomDto> {}

export interface RoomFilters {
  status?: RoomStatus;
  roomTypeId?: string;
  floor?: number;
  search?: string;
}
