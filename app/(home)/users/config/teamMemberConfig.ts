import {
  USER_ROLE_LABELS,
  USER_ROLE_OPTIONS,
  type UserRole,
} from '@/lib/abilities'

export interface TeamMemberResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: UserRole
  canBeHotelManager: boolean
}

export interface TeamMemberListResponse {
  items: TeamMemberResponse[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface AgencyTeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: UserRole
  canBeHotelManager: boolean
}

export type AgencyTeamMemberInput = Omit<AgencyTeamMember, 'id' | 'canBeHotelManager'>

export interface TeamMemberListParams {
  role?: UserRole
  assigned?: boolean
  pageNumber?: number
  pageSize?: number
  search?: string
}

export interface CreateTeamMemberRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: UserRole
}

export interface UpdateTeamMemberRoleRequest {
  role: UserRole
}

export const AGENCY_ROLE_OPTIONS = USER_ROLE_OPTIONS

export const mapTeamMemberResponse = (r: TeamMemberResponse): AgencyTeamMember => ({
  id: String(r.id),
  firstName: r.firstName,
  lastName: r.lastName,
  email: r.email,
  phoneNumber: r.phoneNumber,
  role: r.role,
  canBeHotelManager: r.canBeHotelManager,
})

export const getAgencyTeamMemberName = (
  member: Pick<AgencyTeamMember, 'firstName' | 'lastName'>
) => `${member.firstName} ${member.lastName}`.trim()

export const getAgencyTeamMemberInitials = (
  member: Pick<AgencyTeamMember, 'firstName' | 'lastName'>
) =>
  `${member.firstName[0] ?? ''}${member.lastName[0] ?? ''}`.toUpperCase() || 'TM'

export const getRoleLabel = (role: UserRole) => USER_ROLE_LABELS[role] ?? role
