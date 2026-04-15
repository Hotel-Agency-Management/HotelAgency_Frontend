export const ROOM_AMENITY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const ROOM_AMENITY_STATUS_VALUES = [
  ROOM_AMENITY_STATUS.ACTIVE,
  ROOM_AMENITY_STATUS.INACTIVE,
] as const;

export type RoomAmenityStatus = (typeof ROOM_AMENITY_STATUS_VALUES)[number];

export const ROOM_AMENITY_CATEGORY = {
  COMFORT: "Comfort",
  ENTERTAINMENT: "Entertainment",
  DINING: "Dining",
  BATHROOM: "Bathroom",
  ACCESS: "Access",
  WELLNESS: "Wellness",
  SECURITY: "Security",
} as const;

export const ROOM_AMENITY_CATEGORY_VALUES = [
  ROOM_AMENITY_CATEGORY.COMFORT,
  ROOM_AMENITY_CATEGORY.ENTERTAINMENT,
  ROOM_AMENITY_CATEGORY.DINING,
  ROOM_AMENITY_CATEGORY.BATHROOM,
  ROOM_AMENITY_CATEGORY.ACCESS,
  ROOM_AMENITY_CATEGORY.WELLNESS,
  ROOM_AMENITY_CATEGORY.SECURITY,
] as const;

export type RoomAmenityCategory = (typeof ROOM_AMENITY_CATEGORY_VALUES)[number];

export interface RoomAmenityPhoto {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface RoomAmenity {
  id: string;
  key: string;
  label: string;
  description: string;
  category: RoomAmenityCategory;
  status: RoomAmenityStatus;
  photos: RoomAmenityPhoto[];
  createdAt: string;
  updatedAt: string;
}

export type CreateRoomAmenityDto = Pick<
  RoomAmenity,
  "key" | "label" | "description" | "category" | "status"
>;

export type UpdateRoomAmenityDto = Partial<CreateRoomAmenityDto>;

export interface RoomAmenityFilters {
  search?: string;
  category?: RoomAmenityCategory;
  status?: RoomAmenityStatus;
}
