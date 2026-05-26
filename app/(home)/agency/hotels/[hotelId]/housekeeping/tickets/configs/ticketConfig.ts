export type TicketEndpointScope =
  | { type: "hotel"; hotelId: number }
  | { type: "admin"; agencyId: number; hotelId: number }

export interface StaffItem {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  role: string
  canBeHotelManager: boolean
}

export interface StaffListResponse {
  items: StaffItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface TicketResponse {
  id: number
  hotelId: number
  title: string
  description: string
  priority: string
  status: string
  type: string
  locationType: string
  roomId: number | null
  roomNumber: string | null
  facilityId: number | null
  facilityName: string | null
  assignedToId: number
  assignedToName: string
  createdById: number
  createdByName: string
  deadline: string
  createdAt: string
  updatedAt: string
}

export interface TicketSummaryResponse {
  id: number
  title: string
  priority: string
  status: string
  type: string
  locationType: string
  locationLabel: string
  assignedToId: number
  assignedToName: string
  deadline: string
  createdAt: string
  updatedAt: string
}


export interface TicketBoardResponse {
  todo: TicketSummaryResponse[]
  inProgress: TicketSummaryResponse[]
  review: TicketSummaryResponse[]
  done: TicketSummaryResponse[]
}

export interface TicketListResponse {
  items: TicketSummaryResponse[]
  pageNumber: number
}

export interface CreateTicketRequest {
  title: string
  description: string
  priority: string
  type: string
  locationType: string
  roomId?: number
  facilityId?: number
  assignedToId: number
  deadline: string
}

export type UpdateTicketRequest = CreateTicketRequest

export interface UpdateTicketStatusRequest {
  status: string
}


type TicketVariables = { hotelId: number }
type WithTicketId = TicketVariables & { ticketId: number }

export type CreateTicketVariables = TicketVariables & { data: CreateTicketRequest }
export type UpdateTicketVariables = WithTicketId & { data: UpdateTicketRequest }
export type UpdateTicketStatusVariables = WithTicketId & { data: UpdateTicketStatusRequest }
export type DeleteTicketVariables = WithTicketId

type AdminTicketVariables = TicketVariables & { agencyId: number }
type AdminWithTicketId = AdminTicketVariables & { ticketId: number }

export type CreateAdminTicketVariables = AdminTicketVariables & { data: CreateTicketRequest }
export type UpdateAdminTicketVariables = AdminWithTicketId & { data: UpdateTicketRequest }
export type UpdateAdminTicketStatusVariables = AdminWithTicketId & { data: UpdateTicketStatusRequest }
export type DeleteAdminTicketVariables = AdminWithTicketId
