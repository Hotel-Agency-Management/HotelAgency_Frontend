import { z } from "zod";
import { HOTEL_TERMS_STATUS_VALUES } from "../constants/status";

export const hotelTermsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be 120 characters or less"),
  content: z
    .string()
    .trim()
    .min(1, "Terms content is required")
    .max(20000, "Terms content must be 20,000 characters or less"),
  status: z.enum(HOTEL_TERMS_STATUS_VALUES),
});

export type HotelTermsFormValues = z.infer<typeof hotelTermsSchema>;
