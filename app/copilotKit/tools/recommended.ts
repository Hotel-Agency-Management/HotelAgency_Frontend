import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useRecommendedTool(getRecommendations: () => void) {
  useFrontendTool({
    name: 'recommendedTool',
    description: 'Get recommended actions for the current context',
    parameters: z.object({}),
    handler: async () => {
      getRecommendations()
      return 'Loading recommendations'
    },
  }, [getRecommendations])
}
