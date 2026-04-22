import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/core/utils/apiError";
import { hotelTermsApi } from "../api/hotelTermsApi";
import { hotelTermsQueryKeys } from "./useHotelTermsQueries";
import type {
  HotelTermsAndConditions,
  SaveHotelTermsPayload,
} from "../types/terms";

export function useUpsertHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<HotelTermsAndConditions, unknown, SaveHotelTermsPayload>({
    mutationFn: payload => hotelTermsApi.upsert(payload),
    onSuccess: terms => {
      queryClient.setQueryData(hotelTermsQueryKeys.detail(terms.hotelId), terms);
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.detail(terms.hotelId),
      });
      toast.success("Terms & Conditions saved successfully");
    },
    onError: error => {
      toast.error(getErrorMessage(error, "Failed to save Terms & Conditions"));
    },
  });
}

export function useDeleteHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: hotelId => hotelTermsApi.deleteByHotelId(hotelId),
    onSuccess: (_, hotelId) => {
      queryClient.setQueryData(hotelTermsQueryKeys.detail(hotelId), null);
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.detail(hotelId),
      });
      toast.success("Terms & Conditions deleted successfully");
    },
    onError: error => {
      toast.error(getErrorMessage(error, "Failed to delete Terms & Conditions"));
    },
  });
}
