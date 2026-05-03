import type { BrandingSettings } from '@/core/theme/palette/branding'

export interface CustomerHotel {
  id: string
  agencyId?: number
  agencyName: string
  name: string
  phone?: string
  country: string
  city: string
  hotelZip?: string
  address: string
  currency: string
  cancellationFeeRate: number
  coverImage: string | null
  logo: string | null
  branding: BrandingSettings
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
  hotelZip?: string | null
  postalCode?: string | null
  zip?: string | null
  address: string
  currency: string
  cancellationFeeRate?: number | null
  logo?: string | null
  logoUrl?: string | null
  coverPath?: string | null
  coverImage?: string | null
  branding?: Partial<BrandingSettings> | null
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
