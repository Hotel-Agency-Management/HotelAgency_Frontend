import { USER_ROLE_LABELS, isUserRole } from '@/lib/abilities'

export function getActorRoleLabel(actorRole: string): string {
  return isUserRole(actorRole) ? USER_ROLE_LABELS[actorRole] : actorRole.replace(/_/g, ' ')
}
