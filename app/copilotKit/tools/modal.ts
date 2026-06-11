import { useFrontendTool } from '@copilotkit/react-core/v2'
import { z } from 'zod'

export function useOpenModalTool(openModal: (name: string) => void) {
  useFrontendTool({
    name: 'openModal',
    description: 'Open a modal dialog',
    parameters: z.object({
      name: z.string().describe('Modal name to open'),
    }),
    handler: async ({ name }) => {
      openModal(name)
      return `Opening ${name} modal`
    },
  }, [openModal])
}
