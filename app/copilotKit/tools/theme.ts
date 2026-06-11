import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useUiAppearanceTool(setTheme: (theme: string) => void) {
  useFrontendTool({
    name: 'uiAppearance',
    description: 'Change UI theme or appearance',
    parameters: z.object({
      theme: z.string().describe('Theme: light | dark | system'),
    }),
    handler: async ({ theme }) => {
      setTheme(theme)
      return `Theme set to ${theme}`
    },
  }, [setTheme])
}
