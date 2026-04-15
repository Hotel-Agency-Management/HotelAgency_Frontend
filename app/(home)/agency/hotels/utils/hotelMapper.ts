import type { Hotel, HotelApiResponse, HotelFormValues } from '../types/hotel'
import type { HotelBase } from '../configs/hotelConfig'

const BLOB_URL = process.env.NEXT_PUBLIC_BLOB_URL?.replace(/\/$/, '')
const CONTAINER = process.env.NEXT_PUBLIC_BLOB_CONTAINER_PROFILES
const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:)/i

const buildAssetUrl = (path?: string | null): string | null => {
  if (!path) return null

  if (ABSOLUTE_URL_PATTERN.test(path)) {
    return path
  }

  if (!BLOB_URL || !CONTAINER) {
    return path
  }

  return `${BLOB_URL}/${CONTAINER}/${path.replace(/^\/+/, '')}`
}

export const mapHotelResponseToFormValues = (
  hotel: HotelApiResponse
): HotelFormValues => ({
  basicInfo: {
    name: hotel.name,
    phone: hotel.phone ?? '',
    country: hotel.country,
    city: hotel.city,
    address: hotel.address,
    currency: hotel.currency,
    coverImage: buildAssetUrl(hotel.coverPath),
  },
  branding: {
    logo: buildAssetUrl(hotel.logoUrl),
    colors: {
      primary: hotel.primaryColor,
      secondary: hotel.secondaryColor,
      tertiary: hotel.tertiaryColor,
    },
  },
  managerId: String(hotel.managerUserId),
})

export const mapHotelResponseToHotel = (hotel: HotelApiResponse): Hotel => ({
  ...mapHotelResponseToFormValues(hotel),
  id: String(hotel.id),
  agencyId: hotel.agencyId,
  isActive: hotel.isActive ?? true,
  createdAt: hotel.createdAt,
  updatedAt: hotel.updatedAt,
})

export const mapHotelFormValuesToHotelBase = (
  values: HotelFormValues
): HotelBase => ({
  name: values.basicInfo.name,
  country: values.basicInfo.country,
  city: values.basicInfo.city,
  currency: values.basicInfo.currency,
  phone: values.basicInfo.phone,
  primaryColor: values.branding.colors.primary,
  secondaryColor: values.branding.colors.secondary,
  tertiaryColor: values.branding.colors.tertiary,
  address: values.basicInfo.address,
  managerUserId: Number(values.managerId),
})
