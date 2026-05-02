'use client'

import { useAuth } from '@/core/context/AuthContext'
import { USER_ROLES, type UserRole } from '@/lib/abilities'
import {
  useAdminCreateTeamMember,
  useAdminUpdateTeamMemberRole,
  useCreateTeamMember,
  useUpdateTeamMemberRole,
} from './mutations/useTeamMemberMutations'
import {
  useAdminGetTeamMembers,
  useGetTeamMembers,
} from './queries/useTeamMemberQueries'
import type { AgencyTeamMemberInput, TeamMemberListParams } from '../config/teamMemberConfig'
import toast from 'react-hot-toast'

export function useTeamMembers(params?: TeamMemberListParams, agencyIdOverride?: number) {
  const { user } = useAuth()
  const isSuperAdmin = user?.role === USER_ROLES.SUPER_ADMIN
  const userAgencyId = user?.agencyId === undefined ? undefined : Number(user.agencyId)
  const selectedAgencyId = agencyIdOverride === undefined ? undefined : Number(agencyIdOverride)
  const agencyId = isSuperAdmin ? selectedAgencyId : userAgencyId
  const hasAgencyId = Number.isInteger(agencyId) && Number(agencyId) > 0

  const ownerQuery = useGetTeamMembers(params, !isSuperAdmin)
  const adminQuery = useAdminGetTeamMembers(
    isSuperAdmin && hasAgencyId ? agencyId : undefined,
    params,
    isSuperAdmin && hasAgencyId
  )

  const activeQuery = isSuperAdmin ? adminQuery : ownerQuery

  const ownerCreate = useCreateTeamMember()
  const adminCreate = useAdminCreateTeamMember(agencyId)
  const activeCreate = isSuperAdmin ? adminCreate : ownerCreate
  const ownerUpdateRole = useUpdateTeamMemberRole()
  const adminUpdateRole = useAdminUpdateTeamMemberRole(agencyId)
  const activeUpdateRole = isSuperAdmin ? adminUpdateRole : ownerUpdateRole

  const members = activeQuery.data?.items ?? []

  return {
    members,
    isLoading: activeQuery.isLoading || activeCreate.isPending || activeUpdateRole.isPending,
    totalCount: activeQuery.data?.totalCount ?? 0,
    totalPages: activeQuery.data?.totalPages ?? 1,

    addMember: async (input: AgencyTeamMemberInput) => {
      try {
        await activeCreate.mutateAsync({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phoneNumber: input.phoneNumber,
          role: input.role,
        })
      } catch {
        toast.error('Failed to add member')
      }
    },

    updateMemberRole: async (teamMemberId: string, role: UserRole) => {
      try {
        await activeUpdateRole.mutateAsync({
          teamMemberId: Number(teamMemberId),
          data: { role },
        })
      } catch {
        toast.error('Failed to update member role')
      }
    },

    getMemberById: (id: string) => members.find(m => m.id === id),
  }
}
