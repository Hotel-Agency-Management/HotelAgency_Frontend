'use client'

import { useAuth } from '@/core/context/AuthContext'
import { resolveLoginBranding } from '@/core/theme/palette/loginThemeFactory'
import type { BrandingSettings } from '@/core/theme/palette/branding'

export function useActiveBranding(): BrandingSettings {
  const { user } = useAuth()
  return resolveLoginBranding(user)
}
