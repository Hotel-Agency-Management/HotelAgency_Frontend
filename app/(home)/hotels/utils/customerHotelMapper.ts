import type { CustomerHotel, CustomerHotelApiResponse, CustomerHotelsApiPayload } from '../types/customerHotel'

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

const stableNumber = (seed: string, min: number, max: number) => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return min + (hash % (max - min + 1))
}

export const extractCustomerHotelsPayload = (
  payload: CustomerHotelsApiPayload
): CustomerHotelApiResponse[] => {
  if (Array.isArray(payload)) return payload
  return payload.hotels ?? payload.data ?? []
}

export const mapCustomerHotelApiResponse = (hotel: CustomerHotelApiResponse): CustomerHotel => {
  const id = String(hotel.id)

  return {
    id,
    agencyId: hotel.agencyId,
    agencyName: hotel.agencyName ?? 'Partner agency',
    name: hotel.name,
    phone: hotel.phone ?? undefined,
    country: hotel.country,
    city: hotel.city,
    address: hotel.address,
    currency: hotel.currency,
    coverImage: buildAssetUrl(hotel.coverImage ?? hotel.coverPath),
    logo: buildAssetUrl(hotel.logoUrl),
    managerId: hotel.managerUserId == null ? undefined : String(hotel.managerUserId),
    isActive: hotel.isActive ?? true,
    rating: hotel.rating ?? Number((4.4 + stableNumber(id, 0, 5) / 10).toFixed(1)),
    reviews: hotel.reviews ?? stableNumber(id, 180, 1800),
    amenities: hotel.amenities ?? ['Flexible booking', 'Guest support', 'Verified stay'],
    tag: hotel.tag ?? 'Available worldwide',
  }
}
