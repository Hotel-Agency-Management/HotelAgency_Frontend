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

export const TICKET_BASE = (hotelId: number) =>
  `/hotels/${hotelId}/housekeeping-tickets`

export const STAFF_BASE = (hotelId: number) => `/hotels/${hotelId}/staff`


export const getTicketBoard = async (
  hotelId: number
): Promise<TicketBoardResponse> => {
  const response = await apiClient.get<TicketBoardResponse>(
    `${TICKET_BASE(hotelId)}/board`
  )
  return response.data
}

export const getTickets = async (
  hotelId: number
): Promise<TicketListResponse> => {
  const response = await apiClient.get<TicketListResponse>(TICKET_BASE(hotelId))
  return response.data
}

export const getTicketById = async (
  hotelId: number,
  ticketId: number
): Promise<TicketResponse> => {
  const response = await apiClient.get<TicketResponse>(
    `${TICKET_BASE(hotelId)}/${ticketId}`
  )
  return response.data
}

export const createTicket = async (
  hotelId: number,
  data: CreateTicketRequest
): Promise<TicketResponse> => {
  const response = await apiClient.post<TicketResponse>(
    TICKET_BASE(hotelId),
    data
  )
  return response.data
}

export const updateTicket = async (
  hotelId: number,
  ticketId: number,
  data: UpdateTicketRequest
): Promise<TicketResponse> => {
  const response = await apiClient.put<TicketResponse>(
    `${TICKET_BASE(hotelId)}/${ticketId}`,
    data
  )
  return response.data
}

export const updateTicketStatus = async (
  hotelId: number,
  ticketId: number,
  data: UpdateTicketStatusRequest
): Promise<void> => {
  await apiClient.patch(
    `${TICKET_BASE(hotelId)}/${ticketId}/status`,
    data
  )
}

export const deleteTicket = async (
  hotelId: number,
  ticketId: number
): Promise<void> => {
  await apiClient.delete(`${TICKET_BASE(hotelId)}/${ticketId}`)
}

export const getHousekeepingStaff = async (
  hotelId: number
): Promise<StaffListResponse> => {
  const response = await apiClient.get<StaffListResponse>(STAFF_BASE(hotelId))
  return response.data
}
