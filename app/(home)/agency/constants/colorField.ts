import type { TFunction } from 'i18next'

export const COLOR_FIELDS: { name: string; label: string; hint: string }[] = [
  { name: "colors.primary", label: "Primary", hint: "Main CTA and highlight." },
  { name: "colors.secondary", label: "Secondary", hint: "Supporting accents." },
  { name: "colors.tertiary", label: "Tertiary", hint: "States and chart tones." },
];

export const getColorFields = (t: TFunction) => [
  { name: "colors.primary", label: t('agencySettings.theme.colorPrimary', 'Primary'), hint: t('agencySettings.theme.colorPrimaryHint', 'Main CTA and highlight.') },
  { name: "colors.secondary", label: t('agencySettings.theme.colorSecondary', 'Secondary'), hint: t('agencySettings.theme.colorSecondaryHint', 'Supporting accents.') },
  { name: "colors.tertiary", label: t('agencySettings.theme.colorTertiary', 'Tertiary'), hint: t('agencySettings.theme.colorTertiaryHint', 'States and chart tones.') },
];
