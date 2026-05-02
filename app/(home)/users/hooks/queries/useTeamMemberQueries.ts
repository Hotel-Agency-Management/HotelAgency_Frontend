import { useQuery } from '@tanstack/react-query'
import { adminGetTeamMembers } from '../../client/adminTeamMemberClient'
import { getTeamMembers } from '../../client/teamMemberClient'
import {
  mapTeamMemberResponse,
  type TeamMemberListParams,
} from '../../config/teamMemberConfig'
import { teamMemberQueryKeys } from '../../constants/teamMember'

export const useGetTeamMembers = (params?: TeamMemberListParams, enabled = true) =>
  useQuery({
    queryKey: teamMemberQueryKeys.list(undefined, params),
    queryFn: () => getTeamMembers(params),
    enabled,
    select: data => ({
      ...data,
      items: data.items.map(mapTeamMemberResponse),
    }),
  })

export const useAdminGetTeamMembers = (
  agencyId: number | undefined,
  params?: TeamMemberListParams,
  enabled = true
) =>
  useQuery({
    queryKey: teamMemberQueryKeys.list(agencyId, params),
    queryFn: () => adminGetTeamMembers(agencyId as number, params),
    enabled: enabled && Number.isFinite(agencyId),
    select: data => ({
      ...data,
      items: data.items.map(mapTeamMemberResponse),
    }),
  })
