import type { RoomAmenityFormValues } from "../schema/roomAmenitySchema";
import { ROOM_AMENITY_CATEGORY, ROOM_AMENITY_STATUS } from "../types/roomAmenity";

export const ROOM_AMENITIES_KEY = ["room-amenities"] as const;

export const defaultRoomAmenityFormValues: RoomAmenityFormValues = {
  key: "",
  label: "",
  description: "",
  category: ROOM_AMENITY_CATEGORY.COMFORT,
  status: ROOM_AMENITY_STATUS.ACTIVE,
};
