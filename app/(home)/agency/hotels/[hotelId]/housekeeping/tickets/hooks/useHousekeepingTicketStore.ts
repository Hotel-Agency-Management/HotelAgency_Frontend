import { create } from "zustand";
import { HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_STATUS, TICKET_KEY_PREFIX } from "../constants/ticket";
import { HOUSEKEEPING_TICKETS } from "../data/mockTickets";
import {
  type HousekeepingTicket,
  type HousekeepingTicketValues,
  type HousekeepingTicketStore,
} from "../types/ticket";

type NormalizedTicketValues = Omit<HousekeepingTicket, "id" | "ticketKey" | "status">;

function createTicketLocationFields(values: HousekeepingTicketValues) {
  const isRoom = values.locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM;

  if (isRoom) {
    return {
      locationType: values.locationType,
      roomId: values.roomId,
    };
  }

  return {
    locationType: values.locationType,
    facilityId: values.facilityId,
  };
}

function createNormalizedTicketValues(
  values: HousekeepingTicketValues
): NormalizedTicketValues {
  return {
    ticketType: values.ticketType,
    title: values.title,
    description: values.description,
    assignedTo: values.assignedTo,
    priority: values.priority,
    ...createTicketLocationFields(values),
  };
}

export const useHousekeepingTicketStore = create<HousekeepingTicketStore>((set) => ({
  tickets: HOUSEKEEPING_TICKETS,

  createTicket: (values) =>
    set((state) => ({
      tickets: [
        {
          id: `hk-ticket-${crypto.randomUUID()}`,
          ticketKey: `${TICKET_KEY_PREFIX}-${state.tickets.length + 241}`,
          ...createNormalizedTicketValues(values),
          status: HOUSEKEEPING_TICKET_STATUS.TO_DO,
        },
        ...state.tickets,
      ],
    })),

  moveTicket: (ticketId, newStatus, targetTicketId) =>
    set((state) => {
      const currentIndex = state.tickets.findIndex((ticket) => ticket.id === ticketId);
      const draggedTicket = state.tickets[currentIndex];

      if (!draggedTicket || targetTicketId === ticketId) return state;

      const remainingTickets = state.tickets.filter((ticket) => ticket.id !== ticketId);
      const movedTicket = { ...draggedTicket, status: newStatus };

      if (!targetTicketId) {
        return { tickets: [...remainingTickets, movedTicket] };
      }

      const originalTargetIndex = state.tickets.findIndex(
        (ticket) => ticket.id === targetTicketId
      );
      const targetIndex = remainingTickets.findIndex(
        (ticket) => ticket.id === targetTicketId
      );

      if (targetIndex === -1) {
        return { tickets: [...remainingTickets, movedTicket] };
      }

      if (draggedTicket.status === newStatus) {
        return {
          tickets: [
            ...remainingTickets.slice(0, originalTargetIndex),
            movedTicket,
            ...remainingTickets.slice(originalTargetIndex),
          ],
        };
      }

      return {
        tickets: [
          ...remainingTickets.slice(0, targetIndex),
          movedTicket,
          ...remainingTickets.slice(targetIndex),
        ],
      };
    }),

  updateTicket: (ticketId, values) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) => {
        if (ticket.id !== ticketId) return ticket;

        const baseTicket = { ...ticket };
        delete baseTicket.roomId;
        delete baseTicket.facilityId;

        const normalizedValues = createNormalizedTicketValues(values);

        return {
          ...baseTicket,
          ...normalizedValues,
        };
      }),
    })),

  deleteTicket: (ticketId) =>
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
    })),
}));
