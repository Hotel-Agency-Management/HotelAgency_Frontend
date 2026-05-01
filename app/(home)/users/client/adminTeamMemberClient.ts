import apiClient from '@/core/clients/apiClient'
import type {
  CreateTeamMemberRequest,
  TeamMemberListParams,
  TeamMemberListResponse,
  TeamMemberResponse,
  UpdateTeamMemberRoleRequest,
} from '../config/teamMemberConfig'

export const adminGetTeamMembers = async (
  agencyId: number,
  params?: TeamMemberListParams
): Promise<TeamMemberListResponse> => {
  const response = await apiClient.get<TeamMemberListResponse>(
    `/admin/agencies/${agencyId}/team-members`,
    { params }
  )
  return response.data
}

export const adminCreateTeamMember = async (
  agencyId: number,
  data: CreateTeamMemberRequest
): Promise<TeamMemberResponse> => {
  const response = await apiClient.post<TeamMemberResponse>(
    `/admin/agencies/${agencyId}/team-members`,
    data
  )
  return response.data
}

export const adminUpdateTeamMemberRole = async (
  agencyId: number,
  teamMemberId: number,
  data: UpdateTeamMemberRoleRequest
): Promise<TeamMemberResponse> => {
  const response = await apiClient.put<TeamMemberResponse>(
    `/admin/agencies/${agencyId}/team-members/${teamMemberId}/role`,
    data
  )
  return response.data
}
