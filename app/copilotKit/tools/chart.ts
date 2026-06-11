import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'
import { useAbility } from '@/core/hooks/useAbility'

export function useGenerateChartTool(generateChart: (metric: string) => void) {
  const ability = useAbility()

  useFrontendTool({
    name: 'generateChart',
    description: 'Generate a chart',
    available: ability.can('read', 'Reports'),
    parameters: z.object({
      metric: z.string().describe('Metric to visualize'),
    }),
    handler: async ({ metric }) => {
      generateChart(metric)
      return `Generating ${metric} chart`
    },
  }, [generateChart, ability])
}
