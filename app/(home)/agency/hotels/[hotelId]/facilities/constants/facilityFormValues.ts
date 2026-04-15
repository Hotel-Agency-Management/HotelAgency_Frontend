import type { FacilityFormValues } from "../schema/facilitySchema";
import { FACILITY_STATUS } from "../types/facility";

export const defaultFacilityFormValues: FacilityFormValues = {
  name: "",
  facilityType: "Recreation",
  description: "",
  status: FACILITY_STATUS.AVAILABLE,
  openAt: "08:00:00",
  closeAt: "22:00:00",
};

export const FACILITIES_KEY = ["hotelFacilities"] as const;
