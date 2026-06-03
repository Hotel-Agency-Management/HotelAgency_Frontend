export type TicketCommentType = "General" | "Damage"

export interface TicketCommentResponse {
  id: number
  ticketId: number
  authorId: number
  authorName: string
  commentType: TicketCommentType
  content: string
  damageCost: number | null
  createdAt: string
  updatedAt: string
}

export interface TicketCommentsResponse {
  items: TicketCommentResponse[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface GetTicketCommentsParams {
  pageNumber?: number
  pageSize?: number
}

export interface CreateTicketCommentRequest {
  commentType: TicketCommentType
  content: string
  damageCost?: number
}

export interface UpdateTicketCommentRequest {
  content: string
  damageCost?: number
}

type TicketCommentVariables = {
  hotelId: number
  ticketId: number
}

type WithCommentId = TicketCommentVariables & {
  commentId: number
}

export type GetTicketCommentsVariables = TicketCommentVariables &
  GetTicketCommentsParams

export type CreateTicketCommentVariables = TicketCommentVariables & {
  data: CreateTicketCommentRequest
}

export type UpdateTicketCommentVariables = WithCommentId & {
  data: UpdateTicketCommentRequest
}

export type DeleteTicketCommentVariables = WithCommentId

type AdminTicketCommentVariables = TicketCommentVariables & {
  agencyId: number
}

type AdminWithCommentId = AdminTicketCommentVariables & {
  commentId: number
}

export type GetAdminTicketCommentsVariables = AdminTicketCommentVariables &
  GetTicketCommentsParams

export type DeleteAdminTicketCommentVariables = AdminWithCommentId
