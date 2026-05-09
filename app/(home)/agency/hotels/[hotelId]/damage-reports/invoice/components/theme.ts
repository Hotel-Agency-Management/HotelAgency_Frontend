import { alpha } from '@mui/material/styles'
import { makePalette } from '@/core/theme/palette'
import { resolveBrandingColors } from '@/core/theme/palette/branding'

interface DamageInvoiceThemeOptions {
  primaryColor?: string
  secondaryColor?: string
}

type PaletteIntent = {
  main: string
  dark: string
  contrastText: string
}

export const createDamageInvoiceTheme = ({
  primaryColor,
  secondaryColor,
}: DamageInvoiceThemeOptions) => {
  const brandingColors = resolveBrandingColors({
    primary: primaryColor,
    secondary: secondaryColor,
  })
  const palette = makePalette('light', brandingColors)
  const primary = palette?.primary as PaletteIntent
  const secondary = palette?.secondary as PaletteIntent
  const error = palette?.error as PaletteIntent
  const customColors = palette?.customColors

  return {
    background: {
      page: palette?.background?.paper,
      panel: customColors?.bodyBg,
      footer: customColors?.tableHeaderBg,
      alert: alpha(error.main, 0.08),
    },
    border: {
      default: customColors?.disabled,
      strong: customColors?.disabled,
    },
    brand: {
      primary: primary.main,
      secondary: secondary.main,
      contrast: primary.contrastText,
      watermark: alpha(primary.main, 0.08),
    },
    text: {
      primary: palette?.text?.primary,
      secondary: palette?.text?.secondary,
      inverse: palette?.text?.secondary,
      alert: error.dark,
    },
  }
}

export type DamageInvoiceTheme = ReturnType<typeof createDamageInvoiceTheme>
