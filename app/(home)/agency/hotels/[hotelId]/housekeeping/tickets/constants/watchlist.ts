import type { TicketWatcher } from "../types/ticket";

// TODO: Remove mock data when GET /api/tickets/:id/watchers is ready
export const MOCK_TICKET_WATCHERS: TicketWatcher[] = [
  { id: "mock-1", name: "Samia Asmar", initials: "SA" },
];

// TODO: Replace with GET /api/agencies/:id/users (or similar users endpoint) when ready
export const MOCK_AVAILABLE_USERS: TicketWatcher[] = [
  { id: "mock-1", name: "Samia Asmar", initials: "SA" },
  { id: "mock-2", name: "John Smith", initials: "JS" },
  { id: "mock-3", name: "Sarah Johnson", initials: "SJ" },
  { id: "mock-4", name: "Ahmed Al-Rashid", initials: "AR" },
];
