import { z } from "zod";
import { ROOM_AMENITY_ICON_VALUES } from "../constants/roomAmenityIcons";

export const roomAmenitySchema = z.object({
  title: z.string().trim().min(1, "Amenity title is required"),
  icon: z.enum(ROOM_AMENITY_ICON_VALUES),
});

export type RoomAmenityFormValues = z.infer<typeof roomAmenitySchema>;
