export interface AgencyProfileResponse {
  id: number;
  ownerId: number;
  name: string;
  phone: string;
  country: string;
  city: string;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  tertiaryColor: string | null;
  createdAt: string;
  updatedAt: string;
  planId?: number;
}

export interface UpdateAgencyInfoRequest {
  agencyName?: string;
  phone?: string;
  country?: string;
  city?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  planId?: number;
}
