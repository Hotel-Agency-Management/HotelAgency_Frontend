import apiClient from "@/core/clients/apiClient";
import type { CreateTermsRequest, UpdateTermsRequest, TermsResponse } from "../types/terms";

const getAdminTermsListPath = (agencyId: number, hotelId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/terms`;

const getAdminTermsDetailPath = (agencyId: number, hotelId: number, id: number) =>
  `${getAdminTermsListPath(agencyId, hotelId)}/${id}`;

export const adminGetHotelTerms = async (
  agencyId: number,
  hotelId: number
): Promise<TermsResponse[]> => {
  const response = await apiClient.get<TermsResponse[]>(
    getAdminTermsListPath(agencyId, hotelId)
  );
  return response.data;
};

export const adminGetTermsById = async (
  agencyId: number,
  hotelId: number,
  id: number
): Promise<TermsResponse> => {
  const response = await apiClient.get<TermsResponse>(
    getAdminTermsDetailPath(agencyId, hotelId, id)
  );
  return response.data;
};

export const adminCreateHotelTerms = async (
  agencyId: number,
  hotelId: number,
  data: CreateTermsRequest
): Promise<TermsResponse> => {
  const response = await apiClient.post<TermsResponse>(
    getAdminTermsListPath(agencyId, hotelId),
    data
  );
  return response.data;
};

export const adminUpdateHotelTerms = async (
  agencyId: number,
  hotelId: number,
  id: number,
  data: UpdateTermsRequest
): Promise<TermsResponse> => {
  const response = await apiClient.put<TermsResponse>(
    getAdminTermsDetailPath(agencyId, hotelId, id),
    data
  );
  return response.data;
};
