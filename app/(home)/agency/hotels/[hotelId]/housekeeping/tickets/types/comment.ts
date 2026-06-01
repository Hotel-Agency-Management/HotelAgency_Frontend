import { TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";

export type TicketCommentActionType =
  (typeof TICKET_COMMENT_ACTION_TYPE)[keyof typeof TICKET_COMMENT_ACTION_TYPE];

export interface TicketComment {
  id: string;
  ticketId: string;
  actionType: TicketCommentActionType;
  author: string;
  body: string;
  damageCost?: number | null;
  createdAt: string;
}

export interface AddCommentValues {
  actionType: TicketCommentActionType;
  body: string;
  damageCost?: number;
}
