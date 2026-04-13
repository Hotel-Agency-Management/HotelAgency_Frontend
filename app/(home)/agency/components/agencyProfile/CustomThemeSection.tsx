'use client'
import { useMemo } from 'react'
import { useSettings } from '@/core/hooks/useSettings'
import { sanitizeBrandingSettings, type BrandingSettings } from '@/core/theme/palette/branding'
import { useUpdateAgencyProfile, useUpdateAgencyLogo } from '../../hooks/mutations/useAgencyProfileMutation'
import { useGetAgencyProfile } from '../../hooks/queries/useAgencyProfile'
import { mapBrandingSettings } from '../../util/agencyProfileUtils'
import { CustomThemeTab } from '../theme/CustomThemeTab'

export function CustomThemeSection() {
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

  return (
    <CustomThemeTab
      initialValues={brandingValues}
      onSave={handleThemeSave}
      isSaving={updateAgencyProfile.isPending}
      displayLogo={brandingValues.logo}
      onLogoUpload={handleLogoUpload}
      isLogoUploading={updateAgencyLogo.isPending}
    />
  )
}
