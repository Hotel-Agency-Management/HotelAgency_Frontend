export const getHotelTermsRoute = (hotelId: string, agencyId?: string) =>
  agencyId
    ? `/agencies/${agencyId}/hotels/${hotelId}/settings/terms-and-conditions`
    : `/agency/hotels/${hotelId}/settings/terms-and-conditions`;

export const getHotelSettingsRoute = (hotelId: string, agencyId?: string) =>
  agencyId
    ? `/agencies/${agencyId}/hotels/${hotelId}/settings`
    : `/agency/hotels/${hotelId}/settings`;

export const AGENCY_TERMS_ROUTE = "/agency/settings/terms-and-conditions";
