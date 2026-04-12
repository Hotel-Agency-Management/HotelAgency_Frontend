import { z } from "zod";
import { BED_TYPE_VALUES, ROOM_STATUS_VALUES } from "../types/room";

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floorNumber: z
    .number({ invalid_type_error: "Floor number must be a number" })
    .min(0, "Floor number must be 0 or above"),
  roomTypeId: z.string().min(1, "Room type is required"),
  status: z.enum(ROOM_STATUS_VALUES),
  description: z.string().optional(),
  notes: z.string().optional(),
  capacity: z
    .number({ invalid_type_error: "Capacity must be a number" })
    .min(1, "Capacity must be at least 1"),
  bedType: z.enum(BED_TYPE_VALUES),
  starRating: z
    .number({ invalid_type_error: "Star rating must be a number" })
    .min(1)
    .max(5),
  amenities: z.array(z.string()).default([]),
  pricePerNight: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0)
    .optional(),
});

export type RoomFormValues = z.infer<typeof roomSchema>;
