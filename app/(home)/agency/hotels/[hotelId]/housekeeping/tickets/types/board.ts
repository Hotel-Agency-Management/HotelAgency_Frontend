import type { Palette } from "@mui/material/styles";
import type { HousekeepingTicket, HousekeepingTicketStatus } from "./ticket";

export type BoardPaletteColorKey = keyof Pick<
  Palette,
  "primary" | "secondary" | "error" | "warning" | "info" | "success"
>;

export interface BoardColumn {
  id: HousekeepingTicketStatus;
  label: string;
  colorKey: BoardPaletteColorKey;
}

export interface UseTicketBoardDragOptions {
  tickets: HousekeepingTicket[];
  onMoveTicket: (
    ticketId: string,
    newStatus: HousekeepingTicketStatus,
    targetTicketId?: string
  ) => void;
}
