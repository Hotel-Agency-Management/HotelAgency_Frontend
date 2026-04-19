import { AgencyProfile } from '../types/agencyProfile'
import { AgencyProfileResponse } from '../configs/agencyProfileConfig'
import { resolveBrandingColors, sanitizeBrandingSettings, type BrandingSettings } from '@/core/theme/palette/branding'
import { BACKEND_ORIGIN, EMPTY_PROFILE } from '../constants/agencyProfileConstants'

export function resolveAgencyLogoUrl(logoUrl?: string | null): string | null {
  const value = logoUrl?.trim()

  if (!value) return null
  // Match URLs that already have a protocol (data:, blob:, http, https)
  if (/^(data:|blob:|https?:\/\/)/.test(value)) return value
  if (value.startsWith('/')) return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}${value}` : value

  return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}/${value}` : value
}

export function mapAgencyProfile(profile?: AgencyProfileResponse): AgencyProfile {
  if (!profile) return EMPTY_PROFILE

  return {
    name: profile.name ?? '',
    phone: profile.phone ?? '',
    country: profile.country ?? '',
    city: profile.city ?? '',
    files: [],
  }
}

export function mapBrandingSettings(
  profile?: AgencyProfileResponse,
  fallback?: BrandingSettings
): BrandingSettings {
  return sanitizeBrandingSettings({
    logo: fallback?.logo ?? resolveAgencyLogoUrl(profile?.logoUrl),
    colors: resolveBrandingColors({
      primary: profile?.primaryColor ?? fallback?.colors.primary,
      secondary: profile?.secondaryColor ?? fallback?.colors.secondary,
      tertiary: profile?.tertiaryColor ?? fallback?.colors.tertiary,
    }),
  })
}
