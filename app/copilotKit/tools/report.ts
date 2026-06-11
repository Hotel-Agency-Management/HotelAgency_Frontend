import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'
import { useAbility } from '@/core/hooks/useAbility'

export function useReportGenerationTool(generateReport: (type: string) => void) {
  const ability = useAbility()

  useFrontendTool({
    name: 'reportGeneration',
    description: 'Generate a report',
    available: ability.can('read', 'Reports'), 
    parameters: z.object({
      type: z.string().describe('Type of report'),
    }),
    handler: async ({ type }) => {
      generateReport(type)
      return `Generating ${type} report`
    },
  }, [generateReport, ability])
}
