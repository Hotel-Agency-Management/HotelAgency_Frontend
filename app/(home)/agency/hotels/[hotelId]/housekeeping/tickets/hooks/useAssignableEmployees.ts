"use client";

import { useMemo } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { useGetHousekeepingStaff, useGetAdminHousekeepingStaff } from "./queries/ticketQueries";
import type { TicketEndpointScope } from "../configs/ticketConfig";
import { filterAssignableEmployeesByRole } from "../utils/assigneeFilters";

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
    return filterAssignableEmployeesByRole(user?.role, staffList).map((staff) => ({
      id: staff.id,
      name: `${staff.firstName} ${staff.lastName}`.trim(),
    }));
  }, [staffList, user?.role]);
}
