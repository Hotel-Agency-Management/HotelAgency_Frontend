import apiClient from "@/core/clients/apiClient"
import type {
  CreateTicketCommentRequest,
  GetTicketCommentsParams,
  TicketCommentResponse,
  TicketCommentsResponse,
  UpdateTicketCommentRequest,
} from "../configs/commentConfig"

export const COMMENT_BASE = (hotelId: number, ticketId: number) =>
  `/hotels/${hotelId}/housekeeping-tickets/${ticketId}/comments`

const commentPath = (hotelId: number, ticketId: number, commentId: number) =>
  `${COMMENT_BASE(hotelId, ticketId)}/${commentId}`

const buildCommentsParams = (params?: GetTicketCommentsParams) => ({
  ...(params?.pageNumber ? { pageNumber: params.pageNumber } : {}),
  ...(params?.pageSize ? { pageSize: params.pageSize } : {}),
})

export const getTicketComments = async (
  hotelId: number,
  ticketId: number,
  params?: GetTicketCommentsParams
): Promise<TicketCommentsResponse> => {
  const response = await apiClient.get<TicketCommentsResponse>(
    COMMENT_BASE(hotelId, ticketId),
    { params: buildCommentsParams(params) }
  )
  return response.data
}

export const createTicketComment = async (
  hotelId: number,
  ticketId: number,
  data: CreateTicketCommentRequest
): Promise<TicketCommentResponse> => {
  const response = await apiClient.post<TicketCommentResponse>(
    COMMENT_BASE(hotelId, ticketId),
    data
  )
  return response.data
}

export const updateTicketComment = async (
  hotelId: number,
  ticketId: number,
  commentId: number,
  data: UpdateTicketCommentRequest
): Promise<TicketCommentResponse> => {
  const response = await apiClient.put<TicketCommentResponse>(
    commentPath(hotelId, ticketId, commentId),
    data
  )
  return response.data
}

export const deleteTicketComment = async (
  hotelId: number,
  ticketId: number,
  commentId: number
): Promise<void> => {
  await apiClient.delete(commentPath(hotelId, ticketId, commentId))
}
