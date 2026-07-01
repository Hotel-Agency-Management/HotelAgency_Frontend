import { useCallback } from 'react'
import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'
import { useSettings } from '@/core/hooks/useSettings'
import { isHexColor, normalizeHexColor } from '@/core/theme/palette/branding'

const HEX_DESCRIPTION =
  'Hex color code only (e.g. #1a73e8 or #fff). Do not pass color names like "blue".'

export function useUiAppearanceTool() {
  const { settings, saveSettings } = useSettings()

  const applyAppearance = useCallback(
    (params: {
      mode?: 'light' | 'dark'
      primaryColor?: string
      secondaryColor?: string
      tertiaryColor?: string
      backgroundColor?: string | null
    }) => {
      const nextMode = params.mode ?? settings.mode
      const currentColors = settings.branding.colors

      const nextPrimary = isHexColor(params.primaryColor)
        ? normalizeHexColor(params.primaryColor, currentColors.primary)
        : currentColors.primary

      const nextSecondary = isHexColor(params.secondaryColor)
        ? normalizeHexColor(params.secondaryColor, currentColors.secondary)
        : currentColors.secondary

      const nextTertiary = isHexColor(params.tertiaryColor)
        ? normalizeHexColor(params.tertiaryColor, currentColors.tertiary)
        : currentColors.tertiary

      // null means "reset to mode default"; undefined means "unchanged"
      const nextBg =
        params.backgroundColor === null
          ? null
          : isHexColor(params.backgroundColor)
            ? normalizeHexColor(params.backgroundColor, '')
            : currentColors.backgroundColor

      saveSettings({
        ...settings,
        mode: nextMode,
        branding: {
          ...settings.branding,
          colors: {
            primary: nextPrimary,
            secondary: nextSecondary,
            tertiary: nextTertiary,
            backgroundColor: nextBg,
          },
        },
      })
    },
    [settings, saveSettings],
  )

  useFrontendTool(
    {
      name: 'uiAppearance',
      description: [
        'Change the app visual appearance.',
        'mode → switches the entire UI between light and dark tone (controls sidebar, cards, and text contrast).',
        'backgroundColor → sets the page/body background color directly. Overrides the mode default. Pass null to reset to mode default.',
        'primaryColor → buttons, links, active sidebar items, selected states.',
        'secondaryColor → secondary buttons and secondary palette accents.',
        'tertiaryColor → highlight chips, badges, and accent surfaces.',
        'Supply only the fields the user asked to change — omit everything else.',
        `Current mode: ${settings.mode}.`,
        `Current background: ${settings.branding.colors.backgroundColor ?? 'derived from mode'}.`,
        `Current colors — primary: ${settings.branding.colors.primary}, secondary: ${settings.branding.colors.secondary}, tertiary: ${settings.branding.colors.tertiary}.`,
      ].join(' '),
      parameters: z.object({
        mode: z.enum(['light', 'dark']).optional().describe('Switch light / dark mode'),
        backgroundColor: z
          .string()
          .nullable()
          .optional()
          .describe(`Page body background color. ${HEX_DESCRIPTION} Pass null to reset to mode default.`),
        primaryColor: z.string().optional().describe(`Primary brand color. ${HEX_DESCRIPTION}`),
        secondaryColor: z.string().optional().describe(`Secondary brand color. ${HEX_DESCRIPTION}`),
        tertiaryColor: z.string().optional().describe(`Tertiary accent color. ${HEX_DESCRIPTION}`),
      }),
      handler: async (params) => {
        applyAppearance(params)

        const changes: string[] = []
        if (params.mode) changes.push(`mode → ${params.mode}`)
        if (params.backgroundColor === null) changes.push('background → reset to mode default')
        else if (params.backgroundColor) changes.push(`background → ${params.backgroundColor}`)
        if (params.primaryColor) changes.push(`primary → ${params.primaryColor}`)
        if (params.secondaryColor) changes.push(`secondary → ${params.secondaryColor}`)
        if (params.tertiaryColor) changes.push(`tertiary → ${params.tertiaryColor}`)

        return changes.length > 0
          ? `Appearance updated: ${changes.join(', ')}`
          : 'No appearance changes were applied'
      },
    },
    [applyAppearance, settings],
  )
}
