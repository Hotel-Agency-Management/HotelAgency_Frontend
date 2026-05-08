'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/core/context/AuthContext'
import { getUserProfile } from '@/app/(home)/profile/clients/userProfileClient'
import themeConfig from '@/core/configs/themeConfig'

export interface BrandNameState {
  brandName: string
  isLoading: boolean
}

export function useBrandName(): BrandNameState {
  const { user, isLoading: isAuthLoading } = useAuth()

  const { data, isLoading: isProfileLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    enabled: !!user,
  })

  if (isAuthLoading || isProfileLoading) {
    return { brandName: themeConfig.templateName, isLoading: true }
  }

  if (data?.hotel?.hotelName) {
    return { brandName: data.hotel.hotelName, isLoading: false }
  }

  if (data?.agency?.name) {
    return { brandName: data.agency.name, isLoading: false }
  }

  return { brandName: themeConfig.templateName, isLoading: false }
}
