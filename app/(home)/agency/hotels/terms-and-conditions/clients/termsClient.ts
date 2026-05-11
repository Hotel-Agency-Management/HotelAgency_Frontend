import apiClient from "@/core/clients/apiClient";
import type { CreateTermsRequest, UpdateTermsRequest, TermsResponse } from "../types/terms";

const getTermsListPath = (hotelId: number) => `/hotels/${hotelId}/terms`;
const getTermsDetailPath = (hotelId: number, id: number) =>
  `${getTermsListPath(hotelId)}/${id}`;

export const getHotelTerms = async (hotelId: number): Promise<TermsResponse[]> => {
  const response = await apiClient.get<TermsResponse[]>(getTermsListPath(hotelId));
  return response.data;
};

export const getTermsById = async (hotelId: number, id: number): Promise<TermsResponse> => {
  const response = await apiClient.get<TermsResponse>(getTermsDetailPath(hotelId, id));
  return response.data;
};

export const createHotelTerms = async (
  hotelId: number,
  data: CreateTermsRequest
): Promise<TermsResponse> => {
  const response = await apiClient.post<TermsResponse>(getTermsListPath(hotelId), data);
  return response.data;
};

export const updateHotelTerms = async (
  hotelId: number,
  id: number,
  data: UpdateTermsRequest
): Promise<TermsResponse> => {
  const response = await apiClient.put<TermsResponse>(getTermsDetailPath(hotelId, id), data);
  return response.data;
};
