import { usePathname } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { useAgentContext } from './useAgentContext'

export function useCopilotAgent() {
  const pathname = usePathname()
  const { user } = useAuth()

  useAgentContext({
    user: {
      id: user?.id ?? '',
      role: user?.role ?? '',
      agencyId: user?.agencyId,
      hotelId: user?.hotelId ? Number(user.hotelId) : undefined,
    },
    ui: { page: pathname },
  })
}
