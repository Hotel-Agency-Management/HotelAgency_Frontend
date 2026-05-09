export const hotelTermsQueryKeys = {
  all: ["terms"] as const,
  list: (hotelId?: number) => ["terms", "hotel", hotelId] as const,
  detail: (hotelId?: number, id?: number) => ["terms", "hotel", hotelId, id] as const,
  adminList: (agencyId?: number, hotelId?: number) =>
    ["terms", "admin", agencyId, hotelId] as const,
  adminDetail: (agencyId?: number, hotelId?: number, id?: number) =>
    ["terms", "admin", agencyId, hotelId, id] as const,
};
