import { useQuery } from "@tanstack/react-query";
import { hotelTermsApi } from "../api/hotelTermsApi";
import type { HotelTermsAndConditions } from "../types/terms";

export const hotelTermsQueryKeys = {
  detail: (hotelId?: string) => ["hotel-terms", hotelId] as const,
};

export function useHotelTerms(hotelId?: string) {
  return useQuery<HotelTermsAndConditions | null>({
    queryKey: hotelTermsQueryKeys.detail(hotelId),
    queryFn: () => hotelTermsApi.getByHotelId(hotelId as string),
    enabled: Boolean(hotelId),
  });
}
