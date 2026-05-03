export const facilityPhotoQueryKeys = {
  all: ["facility-photos"] as const,

  list: (hotelId?: number, facilityId?: number) =>
    ["facility-photos", "hotel", hotelId, facilityId] as const,

  adminList: (agencyId?: number, hotelId?: number, facilityId?: number) =>
    ["facility-photos", "admin", agencyId, hotelId, facilityId] as const,

  detail: (hotelId?: number, facilityId?: number, photoId?: number) =>
    ["facility-photos", "hotel", hotelId, facilityId, photoId] as const,

  adminDetail: (
    agencyId?: number,
    hotelId?: number,
    facilityId?: number,
    photoId?: number
  ) =>
    [
      "facility-photos",
      "admin",
      agencyId,
      hotelId,
      facilityId,
      photoId,
    ] as const,
}
