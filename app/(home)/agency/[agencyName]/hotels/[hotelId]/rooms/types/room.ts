export type RoomStatus =
  | "available"
  | "occupied"
  | "maintenance"
  | "reserved"
  | "blocked";

export type BedType = "single" | "double" | "queen" | "king"


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
