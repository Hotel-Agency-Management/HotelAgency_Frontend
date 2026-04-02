import type { PaletteMode } from '@mui/material'
import { alpha, darken, getContrastRatio, lighten } from '@mui/material/styles'

export type BrandingColors = {
  primary: string
  secondary: string
  tertiary: string
}

export type BrandingSettings = {
  logo: string | null
  colors: BrandingColors
}

type PaletteIntent = {
  light: string
  main: string
  dark: string
  contrastText: string
}

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/

export const DEFAULT_BRANDING_COLORS: BrandingColors = {
  primary: '#a67c45',
  secondary: '#52391c',
  tertiary: '#d9b98a'
}

export const DEFAULT_BRANDING_SETTINGS: BrandingSettings = {
  logo: null,
  colors: DEFAULT_BRANDING_COLORS
}

const serializeBrandingSettings = (branding: BrandingSettings) => JSON.stringify(branding)

export const DEFAULT_BRANDING_SIGNATURE = serializeBrandingSettings(DEFAULT_BRANDING_SETTINGS)

export const isHexColor = (value: string | null | undefined) => {
  if (!value) return false

  return HEX_COLOR_REGEX.test(value.trim())
}

export const normalizeHexColor = (value: string | null | undefined, fallback: string) => {
  const nextValue = value?.trim() ?? ''

  if (!isHexColor(nextValue)) {
    return fallback
  }

  if (nextValue.length === 4) {
    return `#${nextValue
      .slice(1)
      .split('')
      .map(char => `${char}${char}`)
      .join('')}`.toLowerCase()
  }

  return nextValue.toLowerCase()
}

export const resolveBrandingColors = (colors?: Partial<BrandingColors> | null): BrandingColors => ({
  primary: normalizeHexColor(colors?.primary, DEFAULT_BRANDING_COLORS.primary),
  secondary: normalizeHexColor(colors?.secondary, DEFAULT_BRANDING_COLORS.secondary),
  tertiary: normalizeHexColor(colors?.tertiary, DEFAULT_BRANDING_COLORS.tertiary)
})

export const sanitizeBrandingSettings = (branding?: Partial<BrandingSettings> | null): BrandingSettings => ({
  logo: typeof branding?.logo === 'string' && branding.logo.trim().length > 0 ? branding.logo : null,
  colors: resolveBrandingColors(branding?.colors)
})

export const isDefaultBrandingSettings = (branding?: Partial<BrandingSettings> | null) =>
  serializeBrandingSettings(sanitizeBrandingSettings(branding)) === DEFAULT_BRANDING_SIGNATURE

const createIntent = (color: string): PaletteIntent => ({
  light: lighten(color, 0.16),
  main: color,
  dark: darken(color, 0.2),
  contrastText: getContrastRatio(color, '#ffffff') >= 4.5 ? '#ffffff' : '#0f1117'
})

export function buildBrandingPalette(mode: PaletteMode, input?: Partial<BrandingColors> | null) {
  const colors = resolveBrandingColors(input)
  const primary = createIntent(colors.primary)
  const secondary = createIntent(colors.secondary)
  const tertiary = createIntent(colors.tertiary)
  const isDark = mode === 'dark'

  return {
    colors,
    primary,
    secondary,
    tertiary,
    customColors: {
      planAvatar: tertiary.main,
      greenBackground: isDark ? alpha(tertiary.main, 0.18) : lighten(tertiary.main, 0.84),
      blueBackground: isDark ? alpha(secondary.main, 0.18) : lighten(secondary.main, 0.84),
      lightPurple: isDark ? alpha(tertiary.main, 0.2) : lighten(tertiary.main, 0.78),
      lightAqua: lighten(secondary.main, isDark ? 0.08 : 0.14),
      subscriptionBlue: secondary.main,
      subscriptionPurple: tertiary.main
    }
  }
}
