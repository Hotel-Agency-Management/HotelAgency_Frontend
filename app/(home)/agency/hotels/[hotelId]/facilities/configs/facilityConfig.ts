export interface CreateFacilityRequest {
  name: string
  facilityType: string
  description: string
  status: string
  openAt: string
  closeAt: string
}

export interface FacilityResponse {
  id: number
  hotelId: number
  name: string
  facilityType: string
  description: string
  status: string
  openAt: string
  closeAt: string
  createdAt: string
  updatedAt: string
}

type FacilityVariables = {
  agencyId: number
  hotelId: number
}

export type WithFacilityId = FacilityVariables & {
  facilityId: number
}

export type CreateFacilityVariables = FacilityVariables & {
  data: CreateFacilityRequest
}

export type UpdateFacilityVariables = WithFacilityId & {
  data: CreateFacilityRequest
}

export type DeleteFacilityVariables = WithFacilityId
