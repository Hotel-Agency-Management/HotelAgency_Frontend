import { z } from "zod";
import {
  ROOM_AMENITY_CATEGORY_VALUES,
  ROOM_AMENITY_STATUS_VALUES,
} from "../types/roomAmenity";

export const roomAmenitySchema = z.object({
  key: z
    .string()
    .trim()
    .min(1, "Amenity key is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, or hyphens"),
  label: z.string().trim().min(1, "Amenity name is required"),
  description: z.string().trim().min(1, "Description is required"),
  category: z.enum(ROOM_AMENITY_CATEGORY_VALUES),
  status: z.enum(ROOM_AMENITY_STATUS_VALUES),
});

export type RoomAmenityFormValues = z.infer<typeof roomAmenitySchema>;
