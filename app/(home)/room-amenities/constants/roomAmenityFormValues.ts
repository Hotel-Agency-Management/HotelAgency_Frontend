import type { RoomAmenityFormValues } from "../schema/roomAmenitySchema";

export const ROOM_AMENITIES_KEY = ["room-amenities"] as const;

export const defaultRoomAmenityFormValues: RoomAmenityFormValues = {
  title: "",
  icon: "spa",
};
