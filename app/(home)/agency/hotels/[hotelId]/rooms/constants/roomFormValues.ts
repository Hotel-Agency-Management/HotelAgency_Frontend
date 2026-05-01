import { RoomFormValues } from "../schema/roomSchema";
import { RoomStatus } from "../types/room";

export const defaultFormValues: RoomFormValues = {
  roomNumber: "",
  floorNumber: 1,
  roomTypeId: 0,
  status: RoomStatus.Available,
  description: "",
  notes: "",
  capacity: 1,
  amenityIds: [],
  dailyPrice: 0,
  weeklyPrice: 0,
  monthlyPrice: 0,
  extendPrice: 0,
  coverPhoto: null,
};

export const ROOMS_KEY = ["rooms"] as const;
