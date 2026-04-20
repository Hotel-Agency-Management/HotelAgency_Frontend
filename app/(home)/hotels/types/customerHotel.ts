export interface CustomerHotel {
  id: string
  agencyId?: number
  agencyName: string
  name: string
  phone?: string
  country: string
  city: string
  address: string
  currency: string
  coverImage: string | null
  logo: string | null
  managerId?: string
  isActive: boolean
  rating: number
  reviews: number
  amenities: string[]
  tag: string
}

export interface CustomerHotelApiResponse {
  id: number | string
  agencyId?: number
  agencyName?: string
  name: string
  country: string
  city: string
  address: string
  currency: string
  logoUrl?: string | null
  coverPath?: string | null
  coverImage?: string | null
  primaryColor?: string
  secondaryColor?: string
  tertiaryColor?: string
  managerUserId?: number | string
  phone?: string | null
  isActive?: boolean
  rating?: number
  reviews?: number
  amenities?: string[]
  tag?: string
}

export type CustomerHotelsApiPayload =
  | CustomerHotelApiResponse[]
  | {
      hotels?: CustomerHotelApiResponse[]
      data?: CustomerHotelApiResponse[]
    }

export type HotelSortOption = 'recommended' | 'rating-desc'

export interface CustomerHotelFilters {
  destination: string
  query: string
  sort: HotelSortOption
}
