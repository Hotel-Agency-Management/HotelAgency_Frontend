import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminCreateTeamMember, adminUpdateTeamMemberRole } from '../../client/adminTeamMemberClient'
import { createTeamMember, updateTeamMemberRole } from '../../client/teamMemberClient'
import {
  mapTeamMemberResponse,
  type AgencyTeamMember,
  type CreateTeamMemberRequest,
  type UpdateTeamMemberRoleRequest,
} from '../../config/teamMemberConfig'
import { teamMemberQueryKeys } from '../../components/userManagement'

interface UpdateTeamMemberRoleVariables {
  teamMemberId: number
  data: UpdateTeamMemberRoleRequest
}

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient()

  return useMutation<AgencyTeamMember, unknown, CreateTeamMemberRequest>({
    mutationFn: async data => mapTeamMemberResponse(await createTeamMember(data)),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: teamMemberQueryKeys.all() })
      toast.success('Team member added successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to add team member'))
    },
  })
}

export const useAdminCreateTeamMember = (agencyId?: number) => {
  const queryClient = useQueryClient()

  return useMutation<AgencyTeamMember, unknown, CreateTeamMemberRequest>({
    mutationFn: async data => {
      if (!Number.isInteger(agencyId) || Number(agencyId) <= 0) {
        throw new Error('Choose an agency before adding a team member')
      }

      return mapTeamMemberResponse(await adminCreateTeamMember(agencyId as number, data))
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: teamMemberQueryKeys.all() })
      toast.success('Team member added successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to add team member'))
    },
  })
}

export const useUpdateTeamMemberRole = () => {
  const queryClient = useQueryClient()

  return useMutation<AgencyTeamMember, unknown, UpdateTeamMemberRoleVariables>({
    mutationFn: async ({ teamMemberId, data }) =>
      mapTeamMemberResponse(await updateTeamMemberRole(teamMemberId, data)),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: teamMemberQueryKeys.all() })
      toast.success('Team member role updated successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to update team member role'))
    },
  })
}

export const useAdminUpdateTeamMemberRole = (agencyId?: number) => {
  const queryClient = useQueryClient()

  return useMutation<AgencyTeamMember, unknown, UpdateTeamMemberRoleVariables>({
    mutationFn: async ({ teamMemberId, data }) => {
      if (!Number.isInteger(agencyId) || Number(agencyId) <= 0) {
        throw new Error('Choose an agency before updating a team member role')
      }

      return mapTeamMemberResponse(
        await adminUpdateTeamMemberRole(agencyId as number, teamMemberId, data)
      )
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: teamMemberQueryKeys.all() })
      toast.success('Team member role updated successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to update team member role'))
    },
  })
}
