import apiClient from "@/core/clients/apiClient"
import type {
  CreateTicketRequest,
  UpdateTicketRequest,
  UpdateTicketStatusRequest,
  TicketResponse,
  TicketBoardResponse,
  TicketListResponse,
  StaffListResponse,
} from "../configs/ticketConfig"

export const TICKET_ADMIN_BASE = (agencyId: number, hotelId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/housekeeping-tickets`

export const STAFF_ADMIN_BASE = (agencyId: number, hotelId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/staff`

const adminTicketPath = (
  agencyId: number,
  hotelId: number,
  ticketId: number
) => `${TICKET_ADMIN_BASE(agencyId, hotelId)}/${ticketId}`

export const getAdminTicketBoard = async (
  agencyId: number,
  hotelId: number
): Promise<TicketBoardResponse> => {
  const response = await apiClient.get<TicketBoardResponse>(
    `${TICKET_ADMIN_BASE(agencyId, hotelId)}/board`
  )
  return response.data
}

export const getAdminTickets = async (
  agencyId: number,
  hotelId: number
): Promise<TicketListResponse> => {
  const response = await apiClient.get<TicketListResponse>(
    TICKET_ADMIN_BASE(agencyId, hotelId)
  )
  return response.data
}

export const getAdminTicketById = async (
  agencyId: number,
  hotelId: number,
  ticketId: number
): Promise<TicketResponse> => {
  const response = await apiClient.get<TicketResponse>(
    adminTicketPath(agencyId, hotelId, ticketId)
  )
  return response.data
}

export const createAdminTicket = async (
  agencyId: number,
  hotelId: number,
  data: CreateTicketRequest
): Promise<TicketResponse> => {
  const response = await apiClient.post<TicketResponse>(
    TICKET_ADMIN_BASE(agencyId, hotelId),
    data
  )
  return response.data
}

export const updateAdminTicket = async (
  agencyId: number,
  hotelId: number,
  ticketId: number,
  data: UpdateTicketRequest
): Promise<TicketResponse> => {
  const response = await apiClient.put<TicketResponse>(
    adminTicketPath(agencyId, hotelId, ticketId),
    data
  )
  return response.data
}

export const updateAdminTicketStatus = async (
  agencyId: number,
  hotelId: number,
  ticketId: number,
  data: UpdateTicketStatusRequest
): Promise<void> => {
  await apiClient.patch(
    `${adminTicketPath(agencyId, hotelId, ticketId)}/status`,
    data
  )
}

export const deleteAdminTicket = async (
  agencyId: number,
  hotelId: number,
  ticketId: number
): Promise<void> => {
  await apiClient.delete(adminTicketPath(agencyId, hotelId, ticketId))
}

export const getAdminHousekeepingStaff = async (
  agencyId: number,
  hotelId: number
): Promise<StaffListResponse> => {
  const response = await apiClient.get<StaffListResponse>(
    STAFF_ADMIN_BASE(agencyId, hotelId)
  )
  return response.data
}
