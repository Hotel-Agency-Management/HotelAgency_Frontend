import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useFormFillingTool(formFill: (data: Record<string, unknown>) => void) {
  useFrontendTool({
    name: 'formFilling',
    description: 'Fill a form with data',
    parameters: z.object({
      data: z.record(z.unknown()).describe('Form data as key-value pairs'),
    }),
    handler: async ({ data }) => {
      formFill(data)
      return 'Form filled'
    },
  }, [formFill])
}
