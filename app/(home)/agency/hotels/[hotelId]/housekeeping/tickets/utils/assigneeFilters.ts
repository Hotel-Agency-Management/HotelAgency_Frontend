import { USER_ROLES, isUserRole, type UserRole } from "@/lib/abilities";
import type { StaffItem } from "../configs/ticketConfig";
import { ASSIGNABLE_ROLES_BY_USER_ROLE } from "../constants/assignee";

export function filterAssignableEmployeesByRole(
  currentUserRole: UserRole | string | null | undefined,
  employees: StaffItem[]
): StaffItem[] {
  if (!isUserRole(currentUserRole)) {
    return [];
  }

  if (currentUserRole === USER_ROLES.SUPER_ADMIN) {
    return employees;
  }

  const assignableRoles = ASSIGNABLE_ROLES_BY_USER_ROLE[currentUserRole];

  if (!assignableRoles) {
    return [];
  }

  return employees.filter((employee) => assignableRoles.includes(employee.role));
}
