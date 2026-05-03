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

type AdminFacilityPhotoVariables = FacilityPhotoVariables & {
  agencyId: number
}

export type AdminWithPhotoId = AdminFacilityPhotoVariables & {
  photoId: number
}

export type UploadAdminFacilityPhotoVariables = AdminFacilityPhotoVariables & {
  file: File
}

export type DeleteAdminFacilityPhotoVariables = AdminWithPhotoId
