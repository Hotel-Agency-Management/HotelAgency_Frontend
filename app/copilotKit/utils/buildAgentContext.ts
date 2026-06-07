import { AppAbility } from "@/lib/abilities"
import { mapAbilityToContext } from "./mapAbilityToContext"
import { getAllowedTools } from "./getAllowedTools"

interface BuildAgentContextParams {
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
  ability: AppAbility
}

export function buildAgentContext({ user, ui, ability }: BuildAgentContextParams) {
  return {
    user: {
      id: user.id,
      role: user.role,
      agencyId: user.agencyId ?? null,
      hotelId: user.hotelId ?? null,
    },
    ui: {
      page: ui.page,
      selectedId: ui.selectedId ?? null,
    },
    permissions: mapAbilityToContext(ability),
    tools: getAllowedTools(ui.page),
  }
}
