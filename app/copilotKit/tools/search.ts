import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useSearchTool(search: (target: string, query: string) => void) {
  useFrontendTool({
    name: 'search',
    description: 'Search in the current page',
    parameters: z.object({
      target: z.string().describe('What to search in'),
      query: z.string().describe('The search term'),
    }),
    handler: async ({ target, query }) => {
      search(target, query)
      return 'Searching...'
    },
  }, [search])
}
