import { AppAbility } from "@/lib/abilities"
import { SUBJECTS, ACTIONS } from "@/lib/abilities/types"

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export function mapAbilityToContext(ability: AppAbility) {
  return Object.fromEntries(
    SUBJECTS.flatMap(subject =>
      ACTIONS.filter(a => a !== 'manage').map(action => [
        `can${capitalize(action)}${subject}`,
        ability.can(action, subject)
      ])
    )
  )
}
