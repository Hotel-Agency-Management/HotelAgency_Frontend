import { useQuery } from "@tanstack/react-query"
import {
  getTicketBoard,
  getTickets,
  getTicketById,
  getHousekeepingStaff,
} from "../../clients/ticketClient"
import {
  getAdminTicketBoard,
  getAdminTickets,
  getAdminTicketById,
  getAdminHousekeepingStaff,
} from "../../clients/adminTicketClient"
import type {
  TicketBoardResponse,
  TicketListResponse,
  TicketResponse,
  StaffListResponse,
} from "../../configs/ticketConfig"
import { ticketQueryKeys } from "../../constants/queryKeys"

export const useGetTicketBoard = (hotelId?: number) => {
  return useQuery<TicketBoardResponse>({
    queryKey: ticketQueryKeys.board(hotelId),
    queryFn: () => getTicketBoard(hotelId as number),
    enabled: Number.isFinite(hotelId),
  })
}

export const useGetAdminTicketBoard = (
  agencyId?: number,
  hotelId?: number
) => {
  return useQuery<TicketBoardResponse>({
    queryKey: ticketQueryKeys.adminBoard(agencyId, hotelId),
    queryFn: () => getAdminTicketBoard(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  })
}

export const useGetTickets = (hotelId?: number) => {
  return useQuery<TicketListResponse>({
    queryKey: ticketQueryKeys.list(hotelId),
    queryFn: () => getTickets(hotelId as number),
    enabled: Number.isFinite(hotelId),
  })
}

export const useGetAdminTickets = (agencyId?: number, hotelId?: number) => {
  return useQuery<TicketListResponse>({
    queryKey: ticketQueryKeys.adminList(agencyId, hotelId),
    queryFn: () => getAdminTickets(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  })
}

export const useGetTicketById = (hotelId?: number, ticketId?: number) => {
  return useQuery<TicketResponse>({
    queryKey: ticketQueryKeys.detail(hotelId, ticketId),
    queryFn: () => getTicketById(hotelId as number, ticketId as number),
    enabled: Number.isFinite(hotelId) && Number.isFinite(ticketId),
  })
}

export const useGetAdminTicketById = (
  agencyId?: number,
  hotelId?: number,
  ticketId?: number
) => {
  return useQuery<TicketResponse>({
    queryKey: ticketQueryKeys.adminDetail(agencyId, hotelId, ticketId),
    queryFn: () =>
      getAdminTicketById(
        agencyId as number,
        hotelId as number,
        ticketId as number
      ),
    enabled:
      Number.isFinite(agencyId) &&
      Number.isFinite(hotelId) &&
      Number.isFinite(ticketId),
  })
}

export const useGetHousekeepingStaff = (hotelId?: number) => {
  return useQuery<StaffListResponse>({
    queryKey: ticketQueryKeys.staff(hotelId),
    queryFn: () => getHousekeepingStaff(hotelId as number),
    enabled: Number.isFinite(hotelId),
  })
}

export const useGetAdminHousekeepingStaff = (
  agencyId?: number,
  hotelId?: number
) => {
  return useQuery<StaffListResponse>({
    queryKey: ticketQueryKeys.adminStaff(agencyId, hotelId),
    queryFn: () =>
      getAdminHousekeepingStaff(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  })
}
