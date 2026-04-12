import { RoomFormValues } from "../schema/roomSchema";
import { BED_TYPE, ROOM_STATUS } from "../types/room";

export const defaultFormValues: RoomFormValues = {
  roomNumber: "",
  floorNumber: 1,
  roomTypeId: "",
  status: ROOM_STATUS.AVAILABLE,
  description: "",
  notes: "",
  capacity: 1,
  bedType: BED_TYPE.SINGLE,
  starRating: 3,
  amenities: [],
  pricePerNight: undefined,
};

export const ROOMS_KEY = ["rooms"] as const;
