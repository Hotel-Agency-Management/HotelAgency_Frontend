'use client'

import { useMemo } from 'react'
import { useAuth } from '@/core/context/AuthContext'
import { useSettings } from '@/core/hooks/useSettings'
import {
  DEFAULT_BRANDING_SETTINGS,
  sanitizeBrandingSettings,
  type BrandingSettings
} from '@/core/theme/palette/branding'
import { useHotelStore } from '@/app/(home)/agency/[agencyName]/hotels/hooks/useHotelStore'
import { USER_ROLES } from '@/lib/abilities'

export function useActiveBranding(): BrandingSettings {
  const { user } = useAuth()
  const { settings } = useSettings()
  const hotels = useHotelStore(state => state.hotels)

  return useMemo(() => {
    if (user?.hotelId) {
      const hotelBranding = hotels.find(hotel => hotel.id === user.hotelId)?.branding

      if (hotelBranding) {
        return sanitizeBrandingSettings(hotelBranding)
      }
    }

    if (user?.role === USER_ROLES.AGENCY_OWNER) {
      return settings.branding
    }

    return DEFAULT_BRANDING_SETTINGS
  }, [hotels, settings.branding, user?.hotelId, user?.role])
}
