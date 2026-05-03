'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/core/context/AuthContext'
import { useSettings } from '@/core/hooks/useSettings'
import {
  DEFAULT_BRANDING_SETTINGS,
  sanitizeBrandingSettings,
  type BrandingSettings
} from '@/core/theme/palette/branding'
import { USER_ROLES } from '@/lib/abilities'
import { useHotelStore } from '@/app/(home)/agency/hotels/hooks/useHotelStore'
import { CUSTOMER_HOTELS_MOCK } from '@/app/(home)/hotels/data/customerHotelsMock'
import { getCustomerHotels } from '@/app/(home)/hotels/data/customerHotelsClient'
import { useGetAgencyProfile } from '@/app/(home)/agency/hooks/queries/useAgencyProfile'
import { mapBrandingSettings } from '@/app/(home)/agency/util/agencyProfileUtils'

const CUSTOMER_HOTEL_DETAIL_PATTERN = /^\/hotels\/([^/?#]+)/

export function useActiveBranding(): BrandingSettings {
  const { user } = useAuth()
  const { settings } = useSettings()
  const { hotels } = useHotelStore(user?.agencyId)
  const pathname = usePathname()
  const { data: agencyProfile } = useGetAgencyProfile({ enabled: user?.role === USER_ROLES.AGENCY_OWNER })
  const customerHotelId = useMemo(() => {
    const match = pathname.match(CUSTOMER_HOTEL_DETAIL_PATTERN)
    return match?.[1] ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const { data: customerHotels = CUSTOMER_HOTELS_MOCK } = useQuery({
    queryKey: ['customer-hotels'],
    queryFn: getCustomerHotels,
    placeholderData: CUSTOMER_HOTELS_MOCK,
    enabled: customerHotelId != null,
  })

  return useMemo(() => {
    if (customerHotelId) {
      const customerHotelBranding = customerHotels.find(hotel => hotel.id === customerHotelId)?.branding

      if (customerHotelBranding) {
        return sanitizeBrandingSettings(customerHotelBranding)
      }
    }

    if (user?.hotelId) {
      const hotelBranding = hotels.find(hotel => hotel.id === user.hotelId)?.branding

      if (hotelBranding) {
        return sanitizeBrandingSettings(hotelBranding)
      }
    }

    if (user?.role === USER_ROLES.AGENCY_OWNER) {
      return mapBrandingSettings(agencyProfile, settings.branding)
    }

    return DEFAULT_BRANDING_SETTINGS
  }, [agencyProfile, customerHotelId, customerHotels, hotels, settings.branding, user?.hotelId, user?.role])
}
