import { z } from "zod";
import { TFunction } from "i18next";
import { FACILITY_STATUS_VALUES } from "../types/facility";

const createTimeSchema = (t: TFunction) =>
  z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, t("zodValidation.timeFormat", "Time must be HH:mm or HH:mm:ss"));

export const createFacilitySchema = (t: TFunction) =>
  z.object({
    name: z.string().trim().min(1, t("zodValidation.facilityNameRequired", "Facility name is required")),
    facilityType: z.string().trim().min(1, t("zodValidation.facilityTypeRequired", "Facility type is required")),
    description: z.string().trim().min(1, t("zodValidation.descriptionRequired", "Description is required")),
    status: z.enum(FACILITY_STATUS_VALUES),
    openAt: createTimeSchema(t),
    closeAt: createTimeSchema(t),
  });

export type FacilityFormValues = z.infer<ReturnType<typeof createFacilitySchema>>;
