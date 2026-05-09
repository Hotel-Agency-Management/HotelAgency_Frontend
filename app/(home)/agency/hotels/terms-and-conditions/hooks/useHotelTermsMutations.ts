import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/core/utils/apiError";
import { createHotelTerms, updateHotelTerms } from "../clients/termsClient";
import { adminCreateHotelTerms, adminUpdateHotelTerms } from "../clients/adminTermsClient";
import type {
  TermsResponse,
  CreateTermsVariables,
  UpdateTermsVariables,
  CreateAdminTermsVariables,
  UpdateAdminTermsVariables,
} from "../types/terms";
import { hotelTermsQueryKeys } from "../constants/termsKey";

export function useCreateHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<TermsResponse, unknown, CreateTermsVariables>({
    mutationFn: ({ hotelId, data }) => createHotelTerms(hotelId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.list(variables.hotelId),
      });
      toast.success("Terms & Conditions created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create Terms & Conditions"));
    },
  });
}

export function useUpdateHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<TermsResponse, unknown, UpdateTermsVariables>({
    mutationFn: ({ hotelId, id, data }) => updateHotelTerms(hotelId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.list(variables.hotelId),
      });
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.detail(variables.hotelId, variables.id),
      });
      toast.success("Terms & Conditions updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update Terms & Conditions"));
    },
  });
}

export function useAdminCreateHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<TermsResponse, unknown, CreateAdminTermsVariables>({
    mutationFn: ({ agencyId, hotelId, data }) =>
      adminCreateHotelTerms(agencyId, hotelId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.adminList(variables.agencyId, variables.hotelId),
      });
      toast.success("Terms & Conditions created successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create Terms & Conditions"));
    },
  });
}

export function useAdminUpdateHotelTerms() {
  const queryClient = useQueryClient();

  return useMutation<TermsResponse, unknown, UpdateAdminTermsVariables>({
    mutationFn: ({ agencyId, hotelId, id, data }) =>
      adminUpdateHotelTerms(agencyId, hotelId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.adminList(variables.agencyId, variables.hotelId),
      });
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.adminDetail(
          variables.agencyId,
          variables.hotelId,
          variables.id
        ),
      });
      toast.success("Terms & Conditions updated successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update Terms & Conditions"));
    },
  });
}
