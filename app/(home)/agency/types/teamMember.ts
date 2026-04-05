import {
  USER_ROLE_LABELS,
  USER_ROLE_OPTIONS,
  type UserRole,
} from "@/lib/abilities";

export interface AgencyTeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
}

export type AgencyTeamMemberInput = Omit<AgencyTeamMember, "id">;

export const AGENCY_ROLE_OPTIONS = USER_ROLE_OPTIONS;

const HOTEL_MANAGER_ROLES: UserRole[] = ["admin", "manager"];

export const canAssignAsHotelManager = (role: UserRole) =>
  HOTEL_MANAGER_ROLES.includes(role);

export const getAgencyTeamMemberName = (member: Pick<AgencyTeamMember, "firstName" | "lastName">) =>
  `${member.firstName} ${member.lastName}`.trim();

export const getAgencyTeamMemberInitials = (member: Pick<AgencyTeamMember, "firstName" | "lastName">) =>
  `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`.toUpperCase() || "TM";

export const getRoleLabel = (role: UserRole) =>
  USER_ROLE_LABELS[role] ?? role;
