import type { User } from '@/core/configs/authConfig'
import { DEFAULT_BRANDING_SETTINGS, type BrandingSettings } from './branding'
import { isHotelTheme, isAgencyTheme } from './themeGuards'
import { hotelThemeToBranding, agencyThemeToBranding } from './themeMappers'

export function resolveLoginBranding(user: User | null): BrandingSettings {
  if (user?.hotelId && isHotelTheme(user.hotelTheme)) {
    return hotelThemeToBranding(user.hotelTheme)
  }
  if (user?.agencyId && isAgencyTheme(user.agencyTheme)) {
    return agencyThemeToBranding(user.agencyTheme)
  }
  return DEFAULT_BRANDING_SETTINGS
}
