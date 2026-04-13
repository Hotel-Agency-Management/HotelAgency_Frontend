'use client'

import { useMemo } from 'react'
import { useSettings } from '@/core/hooks/useSettings'
import {
  sanitizeBrandingSettings,
  type BrandingSettings,
} from '@/core/theme/palette/branding'
import { mapBrandingSettings } from '../util/agencyProfileUtils'
import { useUpdateAgencyProfile, useUpdateAgencyLogo } from './mutations/useAgencyProfileMutation'
import { useGetAgencyProfile } from './queries/useAgencyProfile'

export function useCustomThemeSection() {
  const { data: agencyProfile } = useGetAgencyProfile()
  const updateAgencyProfile = useUpdateAgencyProfile()
  const updateAgencyLogo = useUpdateAgencyLogo()
  const { settings, saveSettings } = useSettings()

  const brandingValues = useMemo(
    () => mapBrandingSettings(agencyProfile, settings.branding),
    [agencyProfile, settings.branding]
  )

  const handleThemeSave = async (branding: BrandingSettings) => {
    const clean = sanitizeBrandingSettings(branding)

    await updateAgencyProfile.mutateAsync({
      primaryColor: clean.colors.primary,
      secondaryColor: clean.colors.secondary,
      tertiaryColor: clean.colors.tertiary,
    })

    saveSettings({ ...settings, branding: clean })
  }

  const handleLogoUpload = async (file: File, previewUrl: string) => {
    await updateAgencyLogo.mutateAsync(file)

    saveSettings({
      ...settings,
      branding: { ...settings.branding, logo: previewUrl },
    })
  }

  return {
    brandingValues,
    handleThemeSave,
    handleLogoUpload,
    isSaving: updateAgencyProfile.isPending,
    isLogoUploading: updateAgencyLogo.isPending,
  }
}
