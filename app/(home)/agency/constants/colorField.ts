import type { TFunction } from 'i18next'

export const COLOR_FIELDS: { name: string; label: string; hint: string }[] = [
  { name: 'colors.primary', label: 'Primary', hint: 'Main CTA and highlight.' },
  { name: 'colors.secondary', label: 'Secondary', hint: 'Supporting accents.' },
  { name: 'colors.tertiary', label: 'Tertiary', hint: 'States and chart tones.' }
]

export const getColorFields = (t: TFunction) => [
  {
    name: 'colors.primary',
    label: t('agencySettings.theme.colorPrimary', { defaultValue: 'Primary' }),
    hint: t('agencySettings.theme.colorPrimaryHint', { defaultValue: 'Main CTA and highlight.' })
  },
  {
    name: 'colors.secondary',
    label: t('agencySettings.theme.colorSecondary', { defaultValue: 'Secondary' }),
    hint: t('agencySettings.theme.colorSecondaryHint', { defaultValue: 'Supporting accents.' })
  },
  {
    name: 'colors.tertiary',
    label: t('agencySettings.theme.colorTertiary', { defaultValue: 'Tertiary' }),
    hint: t('agencySettings.theme.colorTertiaryHint', { defaultValue: 'States and chart tones.' })
  }
]
