"use client";

import { useMemo } from "react";
import { USER_ROLES } from "@/lib/abilities";
import { HousekeepingTicket } from "../types/ticket";

interface UseAssignableEmployeesProps {
  tickets: HousekeepingTicket[];
  assigneeName: string | undefined;
  role: string | undefined;
}

export function useAssignableEmployees({ tickets, assigneeName, role }: UseAssignableEmployeesProps) {
  return useMemo(() => {
    if (role === USER_ROLES.HOUSEKEEPING_EMPLOYEE) {
      return assigneeName ? [assigneeName] : [];
    }

    return Array.from(
      new Set(tickets.map((ticket) => ticket.assignedTo).filter(Boolean))
    );
  }, [assigneeName, tickets, role]);
}
