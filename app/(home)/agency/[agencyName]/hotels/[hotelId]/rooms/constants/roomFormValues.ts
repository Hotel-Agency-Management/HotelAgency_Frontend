import { RoomFormValues } from "../schema/roomSchema";

export const defaultFormValues: RoomFormValues = {
  roomNumber: "",
  floorNumber: 1,
  roomTypeId: "",
  status: "available",
  description: "",
  notes: "",
  capacity: 1,
  bedType: "single",
  starRating: 3,
  amenities: [],
  pricePerNight: undefined,
};

export const ROOMS_KEY = ["rooms"] as const;
