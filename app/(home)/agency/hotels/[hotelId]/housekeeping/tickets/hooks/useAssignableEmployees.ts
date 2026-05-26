"use client";

import { useMemo } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { USER_ROLES } from "@/lib/abilities";
import { useGetHousekeepingStaff, useGetAdminHousekeepingStaff } from "./queries/ticketQueries";
import type { TicketEndpointScope } from "../configs/ticketConfig";

export interface AssignableEmployee {
  id: number;
  name: string;
}

interface UseAssignableEmployeesProps {
  scope: TicketEndpointScope;
}

export function useAssignableEmployees({ scope }: UseAssignableEmployeesProps): AssignableEmployee[] {
  const { user } = useAuth();

  const hotelStaff = useGetHousekeepingStaff(
    scope.type === "hotel" ? scope.hotelId : undefined
  );
  const adminStaff = useGetAdminHousekeepingStaff(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined
  );

  const staffList =
    scope.type === "admin"
      ? (adminStaff.data?.items ?? [])
      : (hotelStaff.data?.items ?? []);

  return useMemo(() => {
    const employees: AssignableEmployee[] = staffList.map((staff) => ({
      id: staff.id,
      name: `${staff.firstName} ${staff.lastName}`.trim(),
    }));

    if (user?.role === USER_ROLES.HOUSEKEEPING_EMPLOYEE) {
      const currentUserEmail = user?.email ?? "";
      const currentUserName = [
        user?.name,
        `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
      ].find(Boolean) ?? "";

      return employees.filter(
        (emp) =>
          emp.name === currentUserName ||
          staffList.some(
            (s) => s.id === emp.id && s.email === currentUserEmail
          )
      );
    }

    return employees;
  }, [staffList, user]);
}
