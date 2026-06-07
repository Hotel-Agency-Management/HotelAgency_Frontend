import { useAbility } from '@/core/hooks/useAbility'
import { useMemo } from 'react'
import { useAgentContext as useCopilotAgentContext } from "@copilotkit/react-core/v2"
import { buildAgentContext } from '../utils/buildAgentContext'

interface UseAgentContextParams {
  user: {
    id: string
    role: string
    agencyId?: number
    hotelId?: number
  }
  ui: {
    page: string
    selectedId?: string
  }
}

export function useAgentContext({ user, ui }: UseAgentContextParams) {
  const ability = useAbility()

  const context = useMemo(
    () => buildAgentContext({ user, ui, ability }),
    [user, ui, ability]
  )

  useCopilotAgentContext({
    value: context,
    description: 'Current user context including role, permissions, and available tools'
  })
}
