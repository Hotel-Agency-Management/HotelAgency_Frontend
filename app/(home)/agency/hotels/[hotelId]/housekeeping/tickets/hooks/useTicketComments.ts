"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/core/context/AuthContext";
import { TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";
import type { AddCommentValues, TicketComment } from "../types/comment";

export function useTicketComments() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [ticketComments, setTicketComments] = useState<Record<string, TicketComment[]>>({});

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
  const resolvedAuthor = user?.name ?? (fullName || user?.email) ?? "Staff";

  const getComments = (ticketId: string): TicketComment[] =>
    ticketComments[ticketId] ?? [];

  const addComment = (ticketId: string, values: AddCommentValues) => {
    setTicketComments((prev) => {
      const existing = prev[ticketId] ?? [];
      const newComment: TicketComment = {
        id: `comment-${crypto.randomUUID()}`,
        ticketId,
        actionType: values.actionType,
        author: resolvedAuthor,
        body: values.body,
        createdAt: new Date().toISOString(),
      };
      return { ...prev, [ticketId]: [newComment, ...existing] };
    });
  };

  const addResolvedComment = (ticketId: string) =>
    addComment(ticketId, {
      actionType: TICKET_COMMENT_ACTION_TYPE.RESOLVED,
      body: t("housekeeping.tickets.comments.resolvedBody", "Ticket marked as resolved."),
    });

  const addDamageReportedComment = (ticketId: string) =>
    addComment(ticketId, {
      actionType: TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED,
      body: t("housekeeping.tickets.comments.damageReportedBody", "Damage report submitted for this room."),
    });

  const editComment = (ticketId: string, commentId: string, newBody: string) => {
    setTicketComments((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] ?? []).map((c) =>
        c.id === commentId ? { ...c, body: newBody } : c
      ),
    }));
  };

  const deleteComment = (ticketId: string, commentId: string) => {
    setTicketComments((prev) => ({
      ...prev,
      [ticketId]: (prev[ticketId] ?? []).filter((c) => c.id !== commentId),
    }));
  };

  return {
    ticketComments,
    getComments,
    addComment,
    addResolvedComment,
    addDamageReportedComment,
    editComment,
    deleteComment,
  };
}
