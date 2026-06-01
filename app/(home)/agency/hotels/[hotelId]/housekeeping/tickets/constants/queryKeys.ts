export const ticketQueryKeys = {
  all: ["housekeeping-tickets"] as const,

  board: (hotelId?: number) =>
    ["housekeeping-tickets", "hotel", hotelId, "board"] as const,

  list: (hotelId?: number) =>
    ["housekeeping-tickets", "hotel", hotelId, "list"] as const,

  detail: (hotelId?: number, ticketId?: number) =>
    ["housekeeping-tickets", "hotel", hotelId, ticketId] as const,

  commentsBase: (hotelId?: number, ticketId?: number) =>
    ["housekeeping-tickets", "hotel", hotelId, ticketId, "comments"] as const,

  comments: (
    hotelId?: number,
    ticketId?: number,
    pageNumber?: number,
    pageSize?: number
  ) =>
    [
      "housekeeping-tickets",
      "hotel",
      hotelId,
      ticketId,
      "comments",
      pageNumber,
      pageSize,
    ] as const,

  staff: (hotelId?: number) =>
    ["housekeeping-tickets", "hotel", hotelId, "staff"] as const,

  adminBoard: (agencyId?: number, hotelId?: number) =>
    ["housekeeping-tickets", "admin", agencyId, hotelId, "board"] as const,

  adminList: (agencyId?: number, hotelId?: number) =>
    ["housekeeping-tickets", "admin", agencyId, hotelId, "list"] as const,

  adminDetail: (agencyId?: number, hotelId?: number, ticketId?: number) =>
    ["housekeeping-tickets", "admin", agencyId, hotelId, ticketId] as const,

  adminCommentsBase: (
    agencyId?: number,
    hotelId?: number,
    ticketId?: number
  ) =>
    [
      "housekeeping-tickets",
      "admin",
      agencyId,
      hotelId,
      ticketId,
      "comments",
    ] as const,

  adminComments: (
    agencyId?: number,
    hotelId?: number,
    ticketId?: number,
    pageNumber?: number,
    pageSize?: number
  ) =>
    [
      "housekeeping-tickets",
      "admin",
      agencyId,
      hotelId,
      ticketId,
      "comments",
      pageNumber,
      pageSize,
    ] as const,

  adminStaff: (agencyId?: number, hotelId?: number) =>
    ["housekeeping-tickets", "admin", agencyId, hotelId, "staff"] as const,
}
