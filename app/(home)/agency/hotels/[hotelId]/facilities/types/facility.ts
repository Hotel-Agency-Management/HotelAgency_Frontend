export const FACILITY_STATUS = {
  AVAILABLE: "Available",
  UNAVAILABLE: "UnAvailable",
} as const;

export const FACILITY_STATUS_VALUES = [
  FACILITY_STATUS.AVAILABLE,
  FACILITY_STATUS.UNAVAILABLE,
] as const;

export type FacilityStatus = (typeof FACILITY_STATUS_VALUES)[number];

export interface FacilityPhoto {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface HotelFacility {
  id: string;
  hotelId: string;
  name: string;
  facilityType: string;
  description: string;
  status: FacilityStatus;
  openAt: string;
  closeAt: string;
  photos: FacilityPhoto[];
  createdAt: string;
  updatedAt: string;
}

export type CreateFacilityDto = Pick<
  HotelFacility,
  "name" | "facilityType" | "description" | "status" | "openAt" | "closeAt"
>;

export type UpdateFacilityDto = Partial<CreateFacilityDto>;

export interface FacilityFilters {
  search?: string;
  status?: FacilityStatus;
  facilityType?: string;
}
