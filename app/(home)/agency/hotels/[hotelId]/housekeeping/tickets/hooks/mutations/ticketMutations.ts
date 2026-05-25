import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import {
  createTicket,
  updateTicket,
  updateTicketStatus,
  deleteTicket,
} from "../../clients/ticketClient"
import {
  createAdminTicket,
  updateAdminTicket,
  updateAdminTicketStatus,
  deleteAdminTicket,
} from "../../clients/adminTicketClient"
import type {
  TicketResponse,
  CreateTicketVariables,
  UpdateTicketVariables,
  UpdateTicketStatusVariables,
  DeleteTicketVariables,
  CreateAdminTicketVariables,
  UpdateAdminTicketVariables,
  UpdateAdminTicketStatusVariables,
  DeleteAdminTicketVariables,
} from "../../configs/ticketConfig"
import { ticketQueryKeys } from "../../constants/queryKeys"
import { getErrorMessage } from "@/core/utils/apiError"

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<TicketResponse, unknown, CreateTicketVariables>({
    mutationFn: ({ hotelId, data }) => createTicket(hotelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.board(variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.list(variables.hotelId),
      })
      toast.success(
        t("housekeeping.tickets.toast.created", "Ticket created successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.createFailed", "Failed to create ticket")
        )
      )
    },
  })
}

export const useCreateAdminTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<TicketResponse, unknown, CreateAdminTicketVariables>({
    mutationFn: ({ agencyId, hotelId, data }) =>
      createAdminTicket(agencyId, hotelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminBoard(variables.agencyId, variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminList(variables.agencyId, variables.hotelId),
      })
      toast.success(
        t("housekeeping.tickets.toast.created", "Ticket created successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.createFailed", "Failed to create ticket")
        )
      )
    },
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<TicketResponse, unknown, UpdateTicketVariables>({
    mutationFn: ({ hotelId, ticketId, data }) =>
      updateTicket(hotelId, ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.board(variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.list(variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.detail(variables.hotelId, variables.ticketId),
      })
      toast.success(
        t("housekeeping.tickets.toast.updated", "Ticket updated successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.updateFailed", "Failed to update ticket")
        )
      )
    },
  })
}

export const useUpdateAdminTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<TicketResponse, unknown, UpdateAdminTicketVariables>({
    mutationFn: ({ agencyId, hotelId, ticketId, data }) =>
      updateAdminTicket(agencyId, hotelId, ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminBoard(variables.agencyId, variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminList(variables.agencyId, variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminDetail(
          variables.agencyId,
          variables.hotelId,
          variables.ticketId
        ),
      })
      toast.success(
        t("housekeeping.tickets.toast.updated", "Ticket updated successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.updateFailed", "Failed to update ticket")
        )
      )
    },
  })
}

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, UpdateTicketStatusVariables>({
    mutationFn: ({ hotelId, ticketId, data }) =>
      updateTicketStatus(hotelId, ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.board(variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.list(variables.hotelId),
      })
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.toast.statusFailed",
            "Failed to update ticket status"
          )
        )
      )
    },
  })
}

export const useUpdateAdminTicketStatus = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, UpdateAdminTicketStatusVariables>({
    mutationFn: ({ agencyId, hotelId, ticketId, data }) =>
      updateAdminTicketStatus(agencyId, hotelId, ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminBoard(variables.agencyId, variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminList(variables.agencyId, variables.hotelId),
      })
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t(
            "housekeeping.tickets.toast.statusFailed",
            "Failed to update ticket status"
          )
        )
      )
    },
  })
}

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteTicketVariables>({
    mutationFn: ({ hotelId, ticketId }) => deleteTicket(hotelId, ticketId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.board(variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.list(variables.hotelId),
      })
      toast.success(
        t("housekeeping.tickets.toast.deleted", "Ticket deleted successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.deleteFailed", "Failed to delete ticket")
        )
      )
    },
  })
}

export const useDeleteAdminTicket = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteAdminTicketVariables>({
    mutationFn: ({ agencyId, hotelId, ticketId }) =>
      deleteAdminTicket(agencyId, hotelId, ticketId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminBoard(variables.agencyId, variables.hotelId),
      })
      queryClient.invalidateQueries({
        queryKey: ticketQueryKeys.adminList(variables.agencyId, variables.hotelId),
      })
      toast.success(
        t("housekeeping.tickets.toast.deleted", "Ticket deleted successfully")
      )
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          t("housekeeping.tickets.toast.deleteFailed", "Failed to delete ticket")
        )
      )
    },
  })
}
