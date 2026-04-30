import { useQuery } from "@tanstack/react-query"
import { getFacilityPhotos, getFacilityPhotoById } from "../../clients/facilityPhotoClient"
import {
  getAdminFacilityPhotos,
  getAdminFacilityPhotoById,
} from "../../clients/adminFacilityPhotoClient"
import { FacilityPhotoItem, WithPhotoId, FacilityPhotoResponse } from "../../configs/facilityPhotosConfig"
import { facilityPhotoQueryKeys } from "../../constants/facilityPhotoQueryKeys"

export const useGetFacilityPhotos = (
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityPhotoItem[]>({
    queryKey: facilityPhotoQueryKeys.list(
      hotelId,
      facilityId
    ),
    queryFn: () =>
      getFacilityPhotos(
        hotelId as number,
        facilityId as number
      ),
    enabled:
      Number.isFinite(hotelId) &&
      Number.isFinite(facilityId),
  })
}

export const useGetFacilityPhotoById = ({
  hotelId,
  facilityId,
  photoId,
}: WithPhotoId) => {
  return useQuery<FacilityPhotoResponse>({
    queryKey: facilityPhotoQueryKeys.detail(
      hotelId,
      facilityId,
      photoId
    ),
    queryFn: () =>
      getFacilityPhotoById(
        hotelId,
        facilityId,
        photoId
      ),
  })
}

export const useGetAdminFacilityPhotos = (
  agencyId?: number,
  hotelId?: number,
  facilityId?: number
) => {
  return useQuery<FacilityPhotoItem[]>({
    queryKey: facilityPhotoQueryKeys.adminList(
      agencyId,
      hotelId,
      facilityId
    ),
    queryFn: () =>
      getAdminFacilityPhotos(
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

export const useGetAdminFacilityPhotoById = ({
  agencyId,
  hotelId,
  facilityId,
  photoId,
}: WithPhotoId & { agencyId: number }) => {
  return useQuery<FacilityPhotoResponse>({
    queryKey: facilityPhotoQueryKeys.adminDetail(
      agencyId,
      hotelId,
      facilityId,
      photoId
    ),
    queryFn: () =>
      getAdminFacilityPhotoById(
        agencyId,
        hotelId,
        facilityId,
        photoId
      ),
  })
}
