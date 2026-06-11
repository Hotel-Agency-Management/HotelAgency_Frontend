import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useTourGuidanceTool(startTour: () => void) {
  useFrontendTool({
    name: 'tourGuidance',
    description: 'Start a guided tour of the current page',
    parameters: z.object({}),
    handler: async () => {
      startTour()
      return 'Tour started'
    },
  }, [startTour])
}
