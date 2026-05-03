'use client'

import { useMemo } from 'react'
import { sanitizeBrandingSettings, type BrandingSettings } from '@/core/theme/palette/branding'
import { mapBrandingSettings } from '@/app/(home)/agency/util/agencyProfileUtils'
import { useGetAdminAgencyProfile } from './queries/useAdminAgencyProfile'
import { useAdminUpdateAgencyProfile, useAdminUpdateAgencyLogo } from './mutations/useAdminAgencyProfileMutations'

export function useAdminCustomThemeSection(agencyId: number) {
  const { data: agencyProfile } = useGetAdminAgencyProfile(agencyId)
  const updateAgencyProfile = useAdminUpdateAgencyProfile(agencyId)
  const updateAgencyLogo = useAdminUpdateAgencyLogo(agencyId)

  const brandingValues = useMemo(
    () => mapBrandingSettings(agencyProfile),
    [agencyProfile]
  )

  const handleThemeSave = async (branding: BrandingSettings) => {
    const clean = sanitizeBrandingSettings(branding)
    await updateAgencyProfile.mutateAsync({
      primaryColor: clean.colors.primary,
      secondaryColor: clean.colors.secondary,
      tertiaryColor: clean.colors.tertiary,
    })
  }

  const handleLogoUpload = async (file: File, _previewUrl: string) => {
    await updateAgencyLogo.mutateAsync(file)
  }

  return {
    brandingValues,
    handleThemeSave,
    handleLogoUpload,
    isSaving: updateAgencyProfile.isPending,
    isLogoUploading: updateAgencyLogo.isPending,
  }
}
