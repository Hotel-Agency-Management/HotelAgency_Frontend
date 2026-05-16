"use client";

import { useMemo } from "react";
import { USER_ROLES } from "@/lib/abilities";
import { useHousekeepingLocations } from "./useHousekeepingLocations";
import { HousekeepingTicket } from "../types/ticket";

interface UseVisibleTicketsProps {
  tickets: HousekeepingTicket[];
  locations: ReturnType<typeof useHousekeepingLocations>;
  normalizedSearch: string;
  assigneeName: string | undefined;
  role: string | undefined;
}

export function useVisibleTickets({
  tickets,
  locations,
  normalizedSearch,
  assigneeName,
  role,
}: UseVisibleTicketsProps) {
  const isEmployee = role === USER_ROLES.HOUSEKEEPING_EMPLOYEE;

  const roleScopedTickets = useMemo(() => {
    if (!isEmployee) return tickets;
    return tickets.filter((ticket) => ticket.assignedTo === assigneeName);
  }, [assigneeName, tickets, isEmployee]);

  const visibleTickets = useMemo(() => {
    if (!normalizedSearch) return roleScopedTickets;

    return roleScopedTickets.filter((ticket) => {
      const room = locations.getTicketRoom(ticket);
      const facility = locations.getTicketFacility(ticket);
      const searchableText = [
        ticket.ticketKey,
        ticket.ticketType,
        ticket.title,
        ticket.description,
        ticket.locationType,
        ticket.roomId ?? "",
        ticket.facilityId ?? "",
        locations.getTicketLocationLabel(ticket),
        room?.roomNumber ?? "",
        facility?.category ?? "",
        ticket.assignedTo,
        ticket.priority,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [locations, normalizedSearch, roleScopedTickets]);

  return { visibleTickets, roleScopedTicketCount: roleScopedTickets.length };
}
