import { HOTEL_TERMS_STATUS_VALUES } from "../constants/status";

export type HotelTermsStatus = (typeof HOTEL_TERMS_STATUS_VALUES)[number];



export interface CreateTermsRequest {
  title: string;
  content: string;
  status: HotelTermsStatus;
}

export type UpdateTermsRequest = CreateTermsRequest;

export interface TermsResponse {
  id: number;
  hotelId: number;
  title: string;
  content: string;
  status: HotelTermsStatus;
  createdAt: string;
  updatedAt: string;
}

export type HotelTermsAndConditions = TermsResponse;

export interface SaveHotelTermsPayload {
  hotelId: string;
  title: string;
  content: string;
  status: HotelTermsStatus;
}

export type TermsEndpointScope =
  | { type: "hotel"; hotelId: number }
  | { type: "admin"; agencyId: number; hotelId: number };

type TermsVariables = {
  hotelId: number;
};

export type CreateTermsVariables = TermsVariables & {
  data: CreateTermsRequest;
};

export type UpdateTermsVariables = TermsVariables & {
  id: number;
  data: UpdateTermsRequest;
};

type AdminTermsVariables = TermsVariables & {
  agencyId: number;
};

export type CreateAdminTermsVariables = AdminTermsVariables & {
  data: CreateTermsRequest;
};

export type UpdateAdminTermsVariables = AdminTermsVariables & {
  id: number;
  data: UpdateTermsRequest;
};
