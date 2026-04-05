import type { PaletteMode, ThemeOptions } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { buildBrandingPalette, type BrandingColors } from './branding'

export function makePalette(mode: PaletteMode, brandingColors?: Partial<BrandingColors> | null): ThemeOptions['palette'] {
  const isDark = mode === 'dark'
  const lightColor = '15, 17, 23'
  const darkColor = '230, 235, 255'
  const mainColor = mode === 'light' ? `rgb(${lightColor})` : `rgb(${darkColor})`
  const brandingPalette = buildBrandingPalette(mode, brandingColors)

  return {
    customColors: {
      main: mainColor,
      light: `rgb(${lightColor})`,
      darkBg: '#0c0c0c',
      lightBg: '#f6f8fc',
      bodyBg: mode === 'light' ? '#f6f8fc' : '#0c0c0c',
      trackBg: mode === 'light' ? '#eceef4' : '#1e1e1e',
      avatarBg: mode === 'light' ? '#e8eaf0' : '#1f1f1f',
      tooltipBg: mode === 'light' ? '#1a1d28' : '#2c2c2c',
      tableHeaderBg: mode === 'light' ? '#f0f2f8' : '#181818',
      disabled: mode === 'light' ? '#dde0ea' : '#2e2e2e',
      planAvatar: brandingPalette.customColors.planAvatar,
      greenBackground: brandingPalette.customColors.greenBackground,
      blueBackground: brandingPalette.customColors.blueBackground,
      lightPurple: brandingPalette.customColors.lightPurple,
      lightAqua: brandingPalette.customColors.lightAqua,
      subscriptionBlue: brandingPalette.customColors.subscriptionBlue,
      subscriptionPurple: brandingPalette.customColors.subscriptionPurple
    },
    mode,
    primary: brandingPalette.primary,
    brand: brandingPalette.primary,
    secondary: brandingPalette.secondary,
    tertiary: brandingPalette.tertiary,
    error: { light: '#FF7A7A', main: '#FF4D4F', dark: '#C62828' },
    warning: { light: '#FFD166', main: '#FFB703', dark: '#C98A00' },
    info: brandingPalette.secondary,
    success: brandingPalette.tertiary,
    divider: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    background: {
      default: isDark ? '#0c0c0c' : '#f6f8fc',
      paper: isDark ? '#161616' : '#ffffff'
    },
    text: {
      primary: isDark ? 'rgba(230,235,255,0.92)' : '#0f1117',
      secondary: isDark ? 'rgba(180,190,220,0.65)' : 'rgba(15,17,23,0.55)',
      disabled: isDark ? 'rgba(180,190,220,0.35)' : 'rgba(15,17,23,0.3)'
    },
    action: {
      hover: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      selected: alpha(brandingPalette.primary.main, isDark ? 0.16 : 0.08),
      disabled: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
      disabledBackground: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
    }
  } as const
}
