export interface FacilityPhotoItem {
  id: number
  photoUrl: string
}

export interface FacilityPhotoResponse {
  id: number
  facilityId: number
  photoUrl: string
  createdAt: string
}

type FacilityPhotoVariables = {
  agencyId: number
  hotelId: number
  facilityId: number
}

export type WithPhotoId = FacilityPhotoVariables & {
  photoId: number
}

export type UploadFacilityPhotoVariables = FacilityPhotoVariables & {
  file: File
}

export type DeleteFacilityPhotoVariables = WithPhotoId
