import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useFilterTool(filter: (field: string, value: string) => void) {
  useFrontendTool({
    name: 'filter',
    description: 'Filter data in the current page',
    parameters: z.object({
      field: z.string().describe('Field to filter by'),
      value: z.string().describe('Filter value'),
    }),
    handler: async ({ field, value }) => {
      filter(field, value)
      return 'Filtering...'
    },
  }, [filter])
}
