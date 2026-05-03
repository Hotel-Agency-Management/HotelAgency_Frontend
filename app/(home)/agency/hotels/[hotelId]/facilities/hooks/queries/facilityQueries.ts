import { useQuery } from "@tanstack/react-query"
import { getFacilities, getFacilityById } from "../../clients/facilityClient"
import {
  getAdminFacilities,
  getAdminFacilityById,
} from "../../clients/adminFacilitiesClient"
import { FacilityResponse } from "../../configs/facilityConfig"

export const facilityQueryKeys = {
  all: ["facilities"] as const,
  list: (hotelId?: number) =>
    ["facilities", "hotel", hotelId] as const,
  detail: (hotelId?: number, facilityId?: number) =>
    ["facilities", "hotel", hotelId, facilityId] as const,
  adminList: (agencyId?: number, hotelId?: number) =>
    ["facilities", "admin", agencyId, hotelId] as const,
  adminDetail: (agencyId?: number, hotelId?: number, facilityId?: number) =>
    ["facilities", "admin", agencyId, hotelId, facilityId] as const,
}

export const useGetFacilities = (hotelId?: number) => {
  return useQuery<FacilityResponse[]>({
    queryKey: facilityQueryKeys.list(hotelId),
    queryFn: () => getFacilities(hotelId as number),
    enabled: Number.isFinite(hotelId),
  })
}

export const useGetFacilityById = (
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityResponse>({
    queryKey: facilityQueryKeys.detail(hotelId, facilityId),
    queryFn: () =>
      getFacilityById(
        hotelId as number,
        facilityId as number
      ),
    enabled:
      Number.isFinite(hotelId) &&
      Number.isFinite(facilityId),
  })
}

export const useGetAdminFacilities = (
  agencyId?: number,
  hotelId?: number
) => {
  return useQuery<FacilityResponse[]>({
    queryKey: facilityQueryKeys.adminList(agencyId, hotelId),
    queryFn: () => getAdminFacilities(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  })
}

export const useGetAdminFacilityById = (
  agencyId?: number,
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityResponse>({
    queryKey: facilityQueryKeys.adminDetail(agencyId, hotelId, facilityId),
    queryFn: () =>
      getAdminFacilityById(
        agencyId as number,
        hotelId as number,
        facilityId as number
      ),
    enabled:
      Number.isFinite(agencyId) &&
      Number.isFinite(hotelId) &&
      Number.isFinite(facilityId),
  })
}
