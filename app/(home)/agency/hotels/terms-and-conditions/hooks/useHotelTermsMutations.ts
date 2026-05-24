import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return useMutation<TermsResponse, unknown, CreateTermsVariables>({
    mutationFn: ({ hotelId, data }) => createHotelTerms(hotelId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.list(variables.hotelId),
      });
      toast.success(t('terms.toast.created', 'Terms & Conditions created successfully'));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, t('terms.toast.createFailed', 'Failed to create Terms & Conditions')));
    },
  });
}

export function useUpdateHotelTerms() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<TermsResponse, unknown, UpdateTermsVariables>({
    mutationFn: ({ hotelId, id, data }) => updateHotelTerms(hotelId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.list(variables.hotelId),
      });
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.detail(variables.hotelId, variables.id),
      });
      toast.success(t('terms.toast.updated', 'Terms & Conditions updated successfully'));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, t('terms.toast.updateFailed', 'Failed to update Terms & Conditions')));
    },
  });
}

export function useAdminCreateHotelTerms() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<TermsResponse, unknown, CreateAdminTermsVariables>({
    mutationFn: ({ agencyId, hotelId, data }) =>
      adminCreateHotelTerms(agencyId, hotelId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelTermsQueryKeys.adminList(variables.agencyId, variables.hotelId),
      });
      toast.success(t('terms.toast.created', 'Terms & Conditions created successfully'));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, t('terms.toast.createFailed', 'Failed to create Terms & Conditions')));
    },
  });
}

export function useAdminUpdateHotelTerms() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
      toast.success(t('terms.toast.updated', 'Terms & Conditions updated successfully'));
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, t('terms.toast.updateFailed', 'Failed to update Terms & Conditions')));
    },
  });
}
