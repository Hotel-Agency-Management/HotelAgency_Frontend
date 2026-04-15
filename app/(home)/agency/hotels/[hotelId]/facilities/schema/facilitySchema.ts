import { z } from "zod";
import { FACILITY_STATUS_VALUES } from "../types/facility";

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Time must be HH:mm or HH:mm:ss");

export const facilitySchema = z.object({
  name: z.string().trim().min(1, "Facility name is required"),
  facilityType: z.string().trim().min(1, "Facility type is required"),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(FACILITY_STATUS_VALUES),
  openAt: timeSchema,
  closeAt: timeSchema,
});

export type FacilityFormValues = z.infer<typeof facilitySchema>;
