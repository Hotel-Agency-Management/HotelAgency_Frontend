import { z } from "zod";
import { RoomStatus } from "../types/room";

const ROOM_STATUS_VALUES = Object.values(RoomStatus) as [RoomStatus, ...RoomStatus[]];

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floorNumber: z
    .number({ invalid_type_error: "Floor number must be a number" })
    .min(0, "Floor number must be 0 or above"),
  roomTypeId: z
    .number({ invalid_type_error: "Room type is required" })
    .min(1, "Room type is required"),
  status: z.enum(ROOM_STATUS_VALUES),
  description: z.string().optional(),
  notes: z.string().optional(),
  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, "Capacity must be at least 1"),
  amenityIds: z.array(z.number()).default([]),
  dailyPrice: z
    .number({ invalid_type_error: "Daily price must be a number" })
    .min(0)
    .default(0),
  weeklyPrice: z
    .number({ invalid_type_error: "Weekly price must be a number" })
    .min(0)
    .default(0),
  monthlyPrice: z
    .number({ invalid_type_error: "Monthly price must be a number" })
    .min(0)
    .default(0),
  extendPrice: z
    .number({ invalid_type_error: "Extend price must be a number" })
    .min(0)
    .default(0),
  coverPhoto: z.custom<File | null>().optional().nullable(),
});

export type RoomFormValues = z.infer<typeof roomSchema>;
