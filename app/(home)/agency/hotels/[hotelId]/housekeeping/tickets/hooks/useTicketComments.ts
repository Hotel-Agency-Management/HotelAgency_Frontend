"use client";

import { useAuth } from "@/core/context/AuthContext";
import { TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";
import type { AddCommentValues, TicketComment } from "../types/comment";
import { useHousekeepingTicketStore } from "./useHousekeepingTicketStore";

export function useTicketComments() {
  const ticketComments = useHousekeepingTicketStore((s) => s.ticketComments);
  const addCommentToStore = useHousekeepingTicketStore((s) => s.addComment);
  const editCommentInStore = useHousekeepingTicketStore((s) => s.editComment);
  const deleteCommentFromStore = useHousekeepingTicketStore((s) => s.deleteComment);
  const { user } = useAuth();

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const resolvedAuthor = user?.name ?? (fullName || user?.email) ?? "Staff";

  const getComments = (ticketId: string): TicketComment[] =>
    ticketComments[ticketId] ?? [];

  const addComment = (ticketId: string, values: AddCommentValues) =>
    addCommentToStore(ticketId, values, resolvedAuthor);

  const addResolvedComment = (ticketId: string) =>
    addCommentToStore(
      ticketId,
      { actionType: TICKET_COMMENT_ACTION_TYPE.RESOLVED, body: "Ticket marked as resolved." },
      resolvedAuthor
    );

  const addDamageReportedComment = (ticketId: string) =>
    addCommentToStore(
      ticketId,
      { actionType: TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED, body: "Damage report submitted for this room." },
      resolvedAuthor
    );

  const editComment = (ticketId: string, commentId: string, newBody: string) =>
    editCommentInStore(ticketId, commentId, newBody);

  const deleteComment = (ticketId: string, commentId: string) =>
    deleteCommentFromStore(ticketId, commentId);

  return { ticketComments, getComments, addComment, addResolvedComment, addDamageReportedComment, editComment, deleteComment };
}
