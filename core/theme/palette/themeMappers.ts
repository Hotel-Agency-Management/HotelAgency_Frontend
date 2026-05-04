import type { HotelTheme } from '@/app/(home)/agency/hotels/types/hotel'
import type { AgencyTheme } from '@/app/(home)/agencies/types/agency'
import { sanitizeBrandingSettings, type BrandingSettings } from './branding'
import { resolveProfileBlobUrl } from '@/core/constant/blobStorage'

export function hotelThemeToBranding(theme: HotelTheme): BrandingSettings {
  return sanitizeBrandingSettings({
    logo: resolveProfileBlobUrl(theme.logoUrl ?? null),
    colors: {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      tertiary: theme.tertiaryColor,
    },
  })
}

export function agencyThemeToBranding(theme: AgencyTheme): BrandingSettings {
  return sanitizeBrandingSettings({
    logo: resolveProfileBlobUrl(theme.logoUrl ?? null),
    colors: {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      tertiary: theme.tertiaryColor,
    },
  })
}
