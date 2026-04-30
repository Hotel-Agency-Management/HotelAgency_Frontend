import { useQuery } from "@tanstack/react-query"
import { getFacilities, getFacilityById } from "../../clients/facilityClient"
import { FacilityResponse } from "../../configs/facilityConfig"

export const facilityQueryKeys = {
  all: ["facilities"] as const,
  list: (agencyId?: number, hotelId?: number) =>
    ["facilities", "list", agencyId, hotelId] as const,
  detail: (agencyId?: number, hotelId?: number, facilityId?: number) =>
    ["facilities", "detail", agencyId, hotelId, facilityId] as const,
}

export const useGetFacilities = (agencyId?: number, hotelId?: number) => {
  return useQuery<FacilityResponse[]>({
    queryKey: facilityQueryKeys.list(agencyId, hotelId),
    queryFn: () => getFacilities(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  })
}

export const useGetFacilityById = (
  agencyId?: number,
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityResponse>({
    queryKey: facilityQueryKeys.detail(agencyId, hotelId, facilityId),
    queryFn: () =>
      getFacilityById(
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
