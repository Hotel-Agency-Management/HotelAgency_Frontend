import type { FacilityResponse } from "../configs/facilityConfig";
import type {
  FacilityPhotoItem,
  FacilityPhotoResponse,
} from "../configs/facilityPhotosConfig";
import {
  type FacilityPhoto,
  type FacilityStatus,
  type HotelFacility,
} from "../types/facility";

type ApiFacilityPhoto = FacilityPhotoItem | FacilityPhotoResponse;

const BLOB_URL = process.env.NEXT_PUBLIC_BLOB_URL?.replace(/\/$/, "");
const CONTAINER = process.env.NEXT_PUBLIC_BLOB_CONTAINER_PROFILES;

function getFacilityPhotoUrl(photoUrl?: string): string {
  if (!photoUrl || !BLOB_URL || !CONTAINER) return "";

  return `${BLOB_URL}/${CONTAINER}/${photoUrl}`;
}

export function normalizeFacilityPhotos(photos: FacilityPhoto[]): FacilityPhoto[] {
  const primaryIndex = photos.findIndex((photo) => photo.isPrimary);
  const nextPrimaryIndex = primaryIndex >= 0 ? primaryIndex : 0;

  return photos.map((photo, index) => ({
    ...photo,
    isPrimary: index === nextPrimaryIndex,
  }));
}

export function mapFacilityPhoto(
  photo: ApiFacilityPhoto,
  index = 0
): FacilityPhoto {
  return {
    id: String(photo.id),
    url: getFacilityPhotoUrl(photo.photoUrl),
    isPrimary: index === 0,
  };
}

export function mapFacilityResponse(
  facility: FacilityResponse,
  photos: ApiFacilityPhoto[] = []
): HotelFacility {
  return {
    id: String(facility.id),
    hotelId: String(facility.hotelId),
    name: facility.name,
    facilityType: facility.facilityType,
    description: facility.description,
    status: facility.status as FacilityStatus,
    openAt: facility.openAt,
    closeAt: facility.closeAt,
    photos: photos.map(mapFacilityPhoto).filter((photo) => photo.url),
    createdAt: facility.createdAt,
    updatedAt: facility.updatedAt,
  };
}
