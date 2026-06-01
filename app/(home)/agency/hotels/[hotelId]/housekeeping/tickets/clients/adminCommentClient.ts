import apiClient from "@/core/clients/apiClient"
import type {
  GetTicketCommentsParams,
  TicketCommentsResponse,
} from "../configs/commentConfig"

export const ADMIN_COMMENT_BASE = (
  agencyId: number,
  hotelId: number,
  ticketId: number
) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/housekeeping-tickets/${ticketId}/comments`

const adminCommentPath = (
  agencyId: number,
  hotelId: number,
  ticketId: number,
  commentId: number
) => `${ADMIN_COMMENT_BASE(agencyId, hotelId, ticketId)}/${commentId}`

const buildCommentsParams = (params?: GetTicketCommentsParams) => ({
  ...(params?.pageNumber ? { pageNumber: params.pageNumber } : {}),
  ...(params?.pageSize ? { pageSize: params.pageSize } : {}),
})

export const getAdminTicketComments = async (
  agencyId: number,
  hotelId: number,
  ticketId: number,
  params?: GetTicketCommentsParams
): Promise<TicketCommentsResponse> => {
  const response = await apiClient.get<TicketCommentsResponse>(
    ADMIN_COMMENT_BASE(agencyId, hotelId, ticketId),
    { params: buildCommentsParams(params) }
  )
  return response.data
}

export const deleteAdminTicketComment = async (
  agencyId: number,
  hotelId: number,
  ticketId: number,
  commentId: number
): Promise<void> => {
  await apiClient.delete(adminCommentPath(agencyId, hotelId, ticketId, commentId))
}
