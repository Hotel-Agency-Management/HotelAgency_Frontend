"use client";

import { useTranslation } from "react-i18next";
import { DEFAULT_PAGINATED_SEARCH_PAGE_SIZE } from "@/core/constant/pagination";
import { TICKET_COMMENT_ACTION_TYPE } from "../constants/comments";
import type { AddCommentValues, TicketComment } from "../types/comment";
import type { TicketEndpointScope } from "../configs/ticketConfig";
import type { TicketCommentResponse } from "../configs/commentConfig";
import {
  useGetAdminTicketComments,
  useGetTicketComments,
} from "./queries/commentQueries";
import {
  useCreateTicketComment,
  useDeleteAdminTicketComment,
  useDeleteTicketComment,
  useUpdateTicketComment,
} from "./mutations/commentMutations";

interface UseTicketCommentsProps {
  scope: TicketEndpointScope;
  ticketId?: string;
  pageNumber?: number;
  pageSize?: number;
}

function toTicketCommentActionType(commentType: TicketCommentResponse["commentType"]) {
  return commentType === "Damage"
    ? TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED
    : TICKET_COMMENT_ACTION_TYPE.FEEDBACK;
}

function toApiCommentType(actionType: AddCommentValues["actionType"]) {
  return actionType === TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED
    ? "Damage"
    : "General";
}

function mapApiComment(comment: TicketCommentResponse): TicketComment {
  return {
    id: String(comment.id),
    ticketId: String(comment.ticketId),
    actionType: toTicketCommentActionType(comment.commentType),
    author: comment.authorName,
    body: comment.content,
    damageCost: comment.damageCost,
    createdAt: comment.createdAt,
  };
}

export function useTicketComments({
  scope,
  ticketId,
  pageNumber = 1,
  pageSize = DEFAULT_PAGINATED_SEARCH_PAGE_SIZE,
}: UseTicketCommentsProps) {
  const { t } = useTranslation();
  const numericTicketId = Number(ticketId);
  const resolvedTicketId = Number.isFinite(numericTicketId)
    ? numericTicketId
    : undefined;

  const hotelComments = useGetTicketComments(
    scope.type === "hotel" ? scope.hotelId : undefined,
    scope.type === "hotel" ? resolvedTicketId : undefined,
    { pageNumber, pageSize }
  );

  const adminComments = useGetAdminTicketComments(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? scope.hotelId : undefined,
    scope.type === "admin" ? resolvedTicketId : undefined,
    { pageNumber, pageSize }
  );

  const createComment = useCreateTicketComment();
  const updateComment = useUpdateTicketComment();
  const deleteHotelComment = useDeleteTicketComment();
  const deleteAdminComment = useDeleteAdminTicketComment();

  const commentsQuery = scope.type === "admin" ? adminComments : hotelComments;
  const comments = (commentsQuery.data?.items ?? []).map(mapApiComment);
  const totalCount = commentsQuery.data?.totalCount ?? 0;

  const getMutationTicketId = (targetTicketId?: string) => {
    const numericTargetTicketId = Number(targetTicketId);
    return Number.isFinite(numericTargetTicketId)
      ? numericTargetTicketId
      : resolvedTicketId;
  };

  const addComment = (values: AddCommentValues, targetTicketId?: string) => {
    const mutationTicketId = getMutationTicketId(targetTicketId);
    if (scope.type !== "hotel" || !mutationTicketId) return;

    createComment.mutate({
      hotelId: scope.hotelId,
      ticketId: mutationTicketId,
      data: {
        commentType: toApiCommentType(values.actionType),
        content: values.body,
        ...(values.damageCost !== undefined ? { damageCost: values.damageCost } : {}),
      },
    });
  };

  const addResolvedComment = (targetTicketId?: string) =>
    addComment({
      actionType: TICKET_COMMENT_ACTION_TYPE.RESOLVED,
      body: t("housekeeping.tickets.comments.resolvedBody", "Ticket marked as resolved."),
    }, targetTicketId);

  const addDamageReportedComment = (
    values?: { body?: string; damageCost?: number },
    targetTicketId?: string
  ) =>
    addComment({
      actionType: TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED,
      body:
        values?.body ??
        t(
          "housekeeping.tickets.comments.damageReportedBody",
          "Damage report submitted for this room."
        ),
      damageCost: values?.damageCost,
    }, targetTicketId);

  const editComment = (commentId: string, newBody: string) => {
    if (scope.type !== "hotel" || !resolvedTicketId) return;

    const existingComment = comments.find((comment) => comment.id === commentId);
    updateComment.mutate({
      hotelId: scope.hotelId,
      ticketId: resolvedTicketId,
      commentId: Number(commentId),
      data: {
        content: newBody,
        ...(existingComment?.damageCost !== undefined &&
        existingComment.damageCost !== null
          ? { damageCost: existingComment.damageCost }
          : {}),
      },
    });
  };

  const deleteComment = (commentId: string) => {
    if (!resolvedTicketId) return;

    const numericCommentId = Number(commentId);
    if (!Number.isFinite(numericCommentId)) return;

    if (scope.type === "admin") {
      deleteAdminComment.mutate({
        agencyId: scope.agencyId,
        hotelId: scope.hotelId,
        ticketId: resolvedTicketId,
        commentId: numericCommentId,
      });
      return;
    }

    deleteHotelComment.mutate({
      hotelId: scope.hotelId,
      ticketId: resolvedTicketId,
      commentId: numericCommentId,
    });
  };

  return {
    comments,
    totalCount,
    isLoading: commentsQuery.isLoading,
    isSuccess: commentsQuery.isSuccess,
    addComment,
    addResolvedComment,
    addDamageReportedComment,
    editComment,
    deleteComment,
  };
}
