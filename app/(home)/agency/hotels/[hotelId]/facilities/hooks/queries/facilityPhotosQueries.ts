import { useQuery } from "@tanstack/react-query"
import { getFacilityPhotos, getFacilityPhotoById } from "../../clients/facilityPhotoClient"
import { FacilityPhotoItem, WithPhotoId, FacilityPhotoResponse } from "../../configs/facilityPhotosConfig"

export const facilityPhotoQueryKeys = {
  all: ["facility-photos"] as const,

  list: (
    agencyId?: number,
    hotelId?: number,
    facilityId?: number
  ) => ["facility-photos", "list", agencyId, hotelId, facilityId] as const,

  detail: (
    agencyId?: number,
    hotelId?: number,
    facilityId?: number,
    photoId?: number
  ) =>
    [
      "facility-photos",
      "detail",
      agencyId,
      hotelId,
      facilityId,
      photoId,
    ] as const,
}

export const useGetFacilityPhotos = (
  agencyId?: number,
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityPhotoItem[]>({
    queryKey: facilityPhotoQueryKeys.list(
      agencyId,
      hotelId,
      facilityId
    ),
    queryFn: () =>
      getFacilityPhotos(
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

export const useGetFacilityPhotoById = ({
  agencyId,
  hotelId,
  facilityId,
  photoId,
}: WithPhotoId) => {
  return useQuery<FacilityPhotoResponse>({
    queryKey: facilityPhotoQueryKeys.detail(
      agencyId,
      hotelId,
      facilityId,
      photoId
    ),
    queryFn: () =>
      getFacilityPhotoById(
        agencyId,
        hotelId,
        facilityId,
        photoId
      ),
  })
}
