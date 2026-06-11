import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useNavigateTool(navigate: (path: string) => void) {
  useFrontendTool({
    name: 'navigate',
    description: 'Navigate to a page',
    parameters: z.object({
      path: z.string().describe('The path to navigate to'),
    }),
    handler: async ({ path }) => {
      navigate(path)
      return `Navigating to ${path}`
    },
  }, [navigate])
}
