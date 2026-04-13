'use client'

import { CustomThemeTab } from '../theme/CustomThemeTab'
import { useCustomThemeSection } from '../../hooks/useCustomThemeSection'

export function CustomThemeSection() {
  const {
    brandingValues,
    handleThemeSave,
    handleLogoUpload,
    isSaving,
    isLogoUploading,
  } = useCustomThemeSection()

  return (
    <CustomThemeTab
      initialValues={brandingValues}
      onSave={handleThemeSave}
      isSaving={isSaving}
      displayLogo={brandingValues.logo}
      onLogoUpload={handleLogoUpload}
      isLogoUploading={isLogoUploading}
    />
  )
}
