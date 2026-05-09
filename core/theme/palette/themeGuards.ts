import type { HotelTheme } from '@/app/(home)/agency/hotels/types/hotel'
import type { AgencyTheme } from '@/app/(home)/agencies/types/agency'

export function isHotelTheme(value: unknown): value is HotelTheme {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.primaryColor === 'string' && typeof v.secondaryColor === 'string' && typeof v.tertiaryColor === 'string'
}

export function isAgencyTheme(value: unknown): value is AgencyTheme {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.primaryColor === 'string' && typeof v.secondaryColor === 'string' && typeof v.tertiaryColor === 'string'
}
