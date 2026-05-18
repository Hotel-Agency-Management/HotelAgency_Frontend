import { create } from "zustand";
import { HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_STATUS, TICKET_KEY_PREFIX } from "../constants/ticket";
import { HOUSEKEEPING_TICKETS } from "../data/mockTickets";
import {
  type HousekeepingTicket,
  type HousekeepingTicketValues,
  type HousekeepingTicketStore,
  type TicketComment,
  type AddCommentValues,
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
    deadline: values.deadline,
    ...createTicketLocationFields(values),
  };
}

const INITIAL_TICKET_COMMENTS: Record<string, TicketComment[]> = {
  "hk-ticket-001": [
    {
      id: "comment-seed-001",
      ticketId: "hk-ticket-001",
      actionType: "FEEDBACK",
      author: "Samia Asmar",
      body: "Room needs extra towels before checkout.",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "comment-seed-002",
      ticketId: "hk-ticket-001",
      actionType: "FEEDBACK",
      author: "Samia Asmar",
      body: "Minibar restock confirmed.",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
  ],
  "hk-ticket-003": [
    {
      id: "comment-seed-003",
      ticketId: "hk-ticket-003",
      actionType: "FEEDBACK",
      author: "Samia Asmar",
      body: "Bathroom tiles need attention.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
  ],
};

export const useHousekeepingTicketStore = create<HousekeepingTicketStore>((set) => ({
  tickets: HOUSEKEEPING_TICKETS,
  ticketComments: INITIAL_TICKET_COMMENTS,

  addComment: (ticketId, values: AddCommentValues, author) =>
    set((state) => {
      const existing = state.ticketComments[ticketId] ?? [];
      const newComment: TicketComment = {
        id: `comment-${crypto.randomUUID()}`,
        ticketId,
        actionType: values.actionType,
        author,
        body: values.body,
        createdAt: new Date().toISOString(),
      };
      return {
        ticketComments: {
          ...state.ticketComments,
          [ticketId]: [newComment, ...existing],
        },
      };
    }),

  editComment: (ticketId, commentId, newBody) =>
    set((state) => ({
      ticketComments: {
        ...state.ticketComments,
        [ticketId]: (state.ticketComments[ticketId] ?? []).map((c) =>
          c.id === commentId ? { ...c, body: newBody } : c
        ),
      },
    })),

  deleteComment: (ticketId, commentId) =>
    set((state) => ({
      ticketComments: {
        ...state.ticketComments,
        [ticketId]: (state.ticketComments[ticketId] ?? []).filter((c) => c.id !== commentId),
      },
    })),

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
