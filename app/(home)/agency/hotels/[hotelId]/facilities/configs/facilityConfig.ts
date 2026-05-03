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

export type FacilityEndpointScope =
  | {
      type: "hotel"
      hotelId: number
    }
  | {
      type: "admin"
      agencyId: number
      hotelId: number
    }

type FacilityVariables = {
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

type AdminFacilityVariables = FacilityVariables & {
  agencyId: number
}

export type AdminWithFacilityId = AdminFacilityVariables & {
  facilityId: number
}

export type CreateAdminFacilityVariables = AdminFacilityVariables & {
  data: CreateFacilityRequest
}

export type UpdateAdminFacilityVariables = AdminWithFacilityId & {
  data: CreateFacilityRequest
}

export type DeleteAdminFacilityVariables = AdminWithFacilityId
