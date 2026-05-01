import apiClient from '@/core/clients/apiClient'
import type {
  CreateTeamMemberRequest,
  TeamMemberListParams,
  TeamMemberListResponse,
  TeamMemberResponse,
  UpdateTeamMemberRoleRequest,
} from '../config/teamMemberConfig'

export const getTeamMembers = async (
  params?: TeamMemberListParams
): Promise<TeamMemberListResponse> => {
  const response = await apiClient.get<TeamMemberListResponse>('/team-members', { params })
  return response.data
}

export const createTeamMember = async (
  data: CreateTeamMemberRequest
): Promise<TeamMemberResponse> => {
  const response = await apiClient.post<TeamMemberResponse>('/team-members', data)
  return response.data
}

export const updateTeamMemberRole = async (
  teamMemberId: number,
  data: UpdateTeamMemberRoleRequest
): Promise<TeamMemberResponse> => {
  const response = await apiClient.put<TeamMemberResponse>(
    `/team-members/${teamMemberId}/role`,
    data
  )
  return response.data
}
