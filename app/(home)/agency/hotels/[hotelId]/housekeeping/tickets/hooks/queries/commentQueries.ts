import { useQueries, useQuery } from "@tanstack/react-query"
import { DEFAULT_PAGINATED_SEARCH_PAGE_SIZE } from "@/core/constant/pagination"
import { getAdminTicketComments } from "../../clients/adminCommentClient"
import { getTicketComments } from "../../clients/commentClient"
import type {
  GetTicketCommentsParams,
  TicketCommentsResponse,
} from "../../configs/commentConfig"
import { ticketQueryKeys } from "../../constants/queryKeys"

export const useGetTicketComments = (
  hotelId?: number,
  ticketId?: number,
  pagination: GetTicketCommentsParams = {}
) => {
  const pageNumber = pagination.pageNumber ?? 1
  const pageSize = pagination.pageSize ?? DEFAULT_PAGINATED_SEARCH_PAGE_SIZE

  return useQuery<TicketCommentsResponse>({
    queryKey: ticketQueryKeys.comments(hotelId, ticketId, pageNumber, pageSize),
    queryFn: () =>
      getTicketComments(hotelId as number, ticketId as number, {
        pageNumber,
        pageSize,
      }),
    enabled: Number.isFinite(hotelId) && Number.isFinite(ticketId),
  })
}

export const useGetAdminTicketComments = (
  agencyId?: number,
  hotelId?: number,
  ticketId?: number,
  pagination: GetTicketCommentsParams = {}
) => {
  const pageNumber = pagination.pageNumber ?? 1
  const pageSize = pagination.pageSize ?? DEFAULT_PAGINATED_SEARCH_PAGE_SIZE

  return useQuery<TicketCommentsResponse>({
    queryKey: ticketQueryKeys.adminComments(
      agencyId,
      hotelId,
      ticketId,
      pageNumber,
      pageSize
    ),
    queryFn: () =>
      getAdminTicketComments(
        agencyId as number,
        hotelId as number,
        ticketId as number,
        { pageNumber, pageSize }
      ),
    enabled:
      Number.isFinite(agencyId) &&
      Number.isFinite(hotelId) &&
      Number.isFinite(ticketId),
  })
}

export const useGetTicketCommentCounts = (
  hotelId?: number,
  ticketIds: number[] = []
) =>
  useQueries({
    queries: ticketIds.map((ticketId) => ({
      queryKey: ticketQueryKeys.comments(hotelId, ticketId, 1, 1),
      queryFn: () =>
        getTicketComments(hotelId as number, ticketId, {
          pageNumber: 1,
          pageSize: DEFAULT_PAGINATED_SEARCH_PAGE_SIZE,
        }),
      enabled: Number.isFinite(hotelId) && Number.isFinite(ticketId),
    })),
  })

export const useGetAdminTicketCommentCounts = (
  agencyId?: number,
  hotelId?: number,
  ticketIds: number[] = []
) =>
  useQueries({
    queries: ticketIds.map((ticketId) => ({
      queryKey: ticketQueryKeys.adminComments(agencyId, hotelId, ticketId, 1, 1),
      queryFn: () =>
        getAdminTicketComments(
          agencyId as number,
          hotelId as number,
          ticketId,
          {
            pageNumber: 1,
            pageSize: DEFAULT_PAGINATED_SEARCH_PAGE_SIZE,
          }
        ),
      enabled:
        Number.isFinite(agencyId) &&
        Number.isFinite(hotelId) &&
        Number.isFinite(ticketId),
    })),
  })
