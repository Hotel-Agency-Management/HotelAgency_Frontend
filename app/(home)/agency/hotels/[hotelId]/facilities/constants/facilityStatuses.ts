import { FACILITY_STATUS, type FacilityStatus } from "../types/facility";

export const FACILITY_STATUSES: Record<
  FacilityStatus,
  { label: string; color: "success" | "error" }
> = {
  [FACILITY_STATUS.AVAILABLE]: { label: "Available", color: "success" },
  [FACILITY_STATUS.UNAVAILABLE]: { label: "Unavailable", color: "error" },
};
