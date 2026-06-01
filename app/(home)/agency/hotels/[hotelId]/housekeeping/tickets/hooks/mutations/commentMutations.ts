import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { deleteAdminTicketComment } from "../../clients/adminCommentClient"
import {
  createTicketComment,
  deleteTicketComment,
  updateTicketComment,
} from "../../clients/commentClient"
import type {
  CreateTicketCommentVariables,
  DeleteAdminTicketCommentVariables,
  DeleteTicketCommentVariables,
  TicketCommentResponse,
  UpdateTicketCommentVariables,
} from "../../configs/commentConfig"
import { ticketQueryKeys } from "../../constants/queryKeys"
import { getErrorMessage } from "@/core/utils/apiError"

export const useCreateTicketComment = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<
    TicketCommentResponse,
    unknown,
    CreateTicketCommentVariables
  >({
    mutationFn: ({ hotelId, ticketId, data }) =>
      createTicketComment(hotelId, ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.commentsBase(
          variables.hotelId,
          variables.ticketId
        ),
      })
      toast.success(
        t(
          "housekeeping.tickets.comments.toast.created",
          "Comment created successfully"
        )
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.comments.toast.createFailed",
            "Failed to create comment"
          )
        )
      )
    },
  })
}

export const useUpdateTicketComment = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<
    TicketCommentResponse,
    unknown,
    UpdateTicketCommentVariables
  >({
    mutationFn: ({ hotelId, ticketId, commentId, data }) =>
      updateTicketComment(hotelId, ticketId, commentId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.commentsBase(
          variables.hotelId,
          variables.ticketId
        ),
      })
      toast.success(
        t(
          "housekeeping.tickets.comments.toast.updated",
          "Comment updated successfully"
        )
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.comments.toast.updateFailed",
            "Failed to update comment"
          )
        )
      )
    },
  })
}

export const useDeleteTicketComment = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteTicketCommentVariables>({
    mutationFn: ({ hotelId, ticketId, commentId }) =>
      deleteTicketComment(hotelId, ticketId, commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.commentsBase(
          variables.hotelId,
          variables.ticketId
        ),
      })
      toast.success(
        t(
          "housekeeping.tickets.comments.toast.deleted",
          "Comment deleted successfully"
        )
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.comments.toast.deleteFailed",
            "Failed to delete comment"
          )
        )
      )
    },
  })
}

export const useDeleteAdminTicketComment = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteAdminTicketCommentVariables>({
    mutationFn: ({ agencyId, hotelId, ticketId, commentId }) =>
      deleteAdminTicketComment(agencyId, hotelId, ticketId, commentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminCommentsBase(
          variables.agencyId,
          variables.hotelId,
          variables.ticketId
        ),
      })
      toast.success(
        t(
          "housekeeping.tickets.comments.toast.deleted",
          "Comment deleted successfully"
        )
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.comments.toast.deleteFailed",
            "Failed to delete comment"
          )
        )
      )
    },
  })
}
