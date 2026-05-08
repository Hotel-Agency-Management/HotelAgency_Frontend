'use client'

import { useAuth } from '@/core/context/AuthContext'
import { useGetHotelById } from '@/app/(home)/agency/hotels/hooks/queries/useHotelQueries'
import { useGetAgencyProfile } from '@/app/(home)/agency/hooks/queries/useAgencyProfile'
import themeConfig from '@/core/configs/themeConfig'

export interface BrandNameState {
  brandName: string
  isLoading: boolean
}

export function useBrandName(): BrandNameState {
  const { user } = useAuth()

  const numericHotelId = user?.hotelId ? Number(user.hotelId) : undefined
  const hasHotelId = Number.isFinite(numericHotelId)
  const hasAgencyId = Boolean(user?.agencyId)

  const hotelQuery = useGetHotelById(hasHotelId ? numericHotelId : undefined)
  const agencyQuery = useGetAgencyProfile({ enabled: !hasHotelId && hasAgencyId })

  if (hasHotelId) {
    return {
      brandName: hotelQuery.data?.basicInfo.name ?? themeConfig.templateName,
      isLoading: hotelQuery.isLoading,
    }
  }

  if (hasAgencyId) {
    return {
      brandName: agencyQuery.data?.name ?? themeConfig.templateName,
      isLoading: agencyQuery.isLoading,
    }
  }

  return { brandName: themeConfig.templateName, isLoading: false }
}
