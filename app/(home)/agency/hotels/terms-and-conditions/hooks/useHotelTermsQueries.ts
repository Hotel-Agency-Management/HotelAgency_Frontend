import { useQuery } from "@tanstack/react-query";
import { getHotelTerms, getTermsById } from "../clients/termsClient";
import { adminGetHotelTerms, adminGetTermsById } from "../clients/adminTermsClient";
import type { TermsResponse } from "../types/terms";
import { hotelTermsQueryKeys } from "../constants/termsKey";

export const useHotelTermsList = (hotelId?: number) => {
  return useQuery<TermsResponse[]>({
    queryKey: hotelTermsQueryKeys.list(hotelId),
    queryFn: () => getHotelTerms(hotelId as number),
    enabled: Number.isFinite(hotelId),
  });
};

export const useHotelTermsById = (hotelId?: number, id?: number) => {
  return useQuery<TermsResponse>({
    queryKey: hotelTermsQueryKeys.detail(hotelId, id),
    queryFn: () => getTermsById(hotelId as number, id as number),
    enabled: Number.isFinite(hotelId) && Number.isFinite(id),
  });
};

export const useAdminHotelTermsList = (agencyId?: number, hotelId?: number) => {
  return useQuery<TermsResponse[]>({
    queryKey: hotelTermsQueryKeys.adminList(agencyId, hotelId),
    queryFn: () => adminGetHotelTerms(agencyId as number, hotelId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
  });
};

export const useAdminHotelTermsById = (
  agencyId?: number,
  hotelId?: number,
  id?: number
) => {
  return useQuery<TermsResponse>({
    queryKey: hotelTermsQueryKeys.adminDetail(agencyId, hotelId, id),
    queryFn: () => adminGetTermsById(agencyId as number, hotelId as number, id as number),
    enabled:
      Number.isFinite(agencyId) &&
      Number.isFinite(hotelId) &&
      Number.isFinite(id),
  });
};

export function useHotelTerms(hotelId?: string) {
  const query = useHotelTermsList(hotelId !== undefined ? Number(hotelId) : undefined);

  return {
    ...query,
    data: query.data?.[0] ?? null,
  };
}
