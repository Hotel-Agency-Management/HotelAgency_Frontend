import type { HotelApiResponse } from '../types/hotel'

export interface HotelListParams {
  pageNumber?: number
  pageSize?: number
  search?: string
  location?: string
}

export interface HotelListResponse {
  items: HotelResponse[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface HotelBase {
  name: string
  country: string
  city: string
  currency: string
  phone: string
  cancellationFeePercentage: number
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  address: string
  managerUserId: number
}

export interface CreateHotelRequest extends HotelBase {
  logo?: File | null
  coverPhoto?: File | null
}

export interface UpdateHotelRequest extends HotelBase {
  logo?: File | null
  coverPhoto?: File | null
}

export type HotelResponse = HotelApiResponse

export type CreateHotelVariables = {
  agencyId: number
  data: CreateHotelRequest
}

export type UpdateHotelVariables = {
  agencyId: number
  hotelId: number
  data: UpdateHotelRequest
}

export type DeleteHotelVariables = {
  agencyId: number
  hotelId: number
}
