import type { Hotel, HotelApiResponse, HotelFormValues } from '../types/hotel'
import type { HotelBase } from '../configs/hotelConfig'
import { ABSOLUTE_URL_PATTERN, BLOB_URL, CONTAINER } from '@/core/constant/blob'
import { DEFAULT_CANCELLATION_FEE_RATE } from '../constants/hotel'

const clampPercentage = (value: number) => Math.min(Math.max(value, 0), 100)

const rateToPercentage = (rate?: number | null) => {
  if (rate == null || !Number.isFinite(rate)) {
    return DEFAULT_CANCELLATION_FEE_RATE * 100
  }

  return clampPercentage(Math.round(rate > 1 ? rate : rate * 100))
}

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
    cancellationFeePercentage: rateToPercentage(hotel.cancellationFeeRate),
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
  cancellationFeePercentage: clampPercentage(
    Number.isFinite(values.basicInfo.cancellationFeePercentage)
      ? values.basicInfo.cancellationFeePercentage
      : DEFAULT_CANCELLATION_FEE_RATE * 100
  ),
  primaryColor: values.branding.colors.primary,
  secondaryColor: values.branding.colors.secondary,
  tertiaryColor: values.branding.colors.tertiary,
  address: values.basicInfo.address,
  managerUserId: Number(values.managerId),
})
