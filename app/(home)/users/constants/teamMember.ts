import { USER_ROLES } from '@/lib/abilities'
import type { AgencyTeamMemberInput, TeamMemberListParams } from '../config/teamMemberConfig'

export const defaultTeamMemberValues: AgencyTeamMemberInput = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: USER_ROLES.PROPERTY_MANAGER,
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const teamMemberQueryKeys = {
  all: () => ['team-members'] as const,
  byAgency: (agencyId?: number) => ['team-members', agencyId] as const,
  list: (agencyId?: number, params?: TeamMemberListParams) =>
    ['team-members', agencyId, params] as const,
}
