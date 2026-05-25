import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import {
  createFacility,
  updateFacility,
  deleteFacility,
} from "../../clients/facilityClient"
import {
  createAdminFacility,
  updateAdminFacility,
  deleteAdminFacility,
} from "../../clients/adminFacilitiesClient"
import type {
  FacilityResponse,
  CreateFacilityVariables,
  UpdateFacilityVariables,
  DeleteFacilityVariables,
  CreateAdminFacilityVariables,
  UpdateAdminFacilityVariables,
  DeleteAdminFacilityVariables,
} from "../../configs/facilityConfig"
import { facilityQueryKeys } from "../queries/facilityQueries"
import { getErrorMessage } from "@/core/utils/apiError"

export const useCreateFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<FacilityResponse, unknown, CreateFacilityVariables>({
    mutationFn: ({ hotelId, data }) => createFacility(hotelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.hotelId),
      })

      toast.success(t("facilities.toast.created", "Facility created successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.createFailed", "Failed to create facility")))
    },
  })
}

export const useUpdateFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<FacilityResponse, unknown, UpdateFacilityVariables>({
    mutationFn: ({ hotelId, facilityId, data }) =>
      updateFacility(hotelId, facilityId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.hotelId),
      })

      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.detail(
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success(t("facilities.toast.updated", "Facility updated successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.updateFailed", "Failed to update facility")))
    },
  })
}

export const useDeleteFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteFacilityVariables>({
    mutationFn: ({ hotelId, facilityId }) =>
      deleteFacility(hotelId, facilityId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.hotelId),
      })

      toast.success(t("facilities.toast.deleted", "Facility deleted successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.deleteFailed", "Failed to delete facility")))
    },
  })
}

export const useCreateAdminFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<FacilityResponse, unknown, CreateAdminFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, data }) =>
      createAdminFacility(agencyId, hotelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.adminList(
          variables.agencyId,
          variables.hotelId
        ),
      })

      toast.success(t("facilities.toast.created", "Facility created successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.createFailed", "Failed to create facility")))
    },
  })
}

export const useUpdateAdminFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<FacilityResponse, unknown, UpdateAdminFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId, data }) =>
      updateAdminFacility(agencyId, hotelId, facilityId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.adminList(
          variables.agencyId,
          variables.hotelId
        ),
      })

      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.adminDetail(
          variables.agencyId,
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success(t("facilities.toast.updated", "Facility updated successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.updateFailed", "Failed to update facility")))
    },
  })
}

export const useDeleteAdminFacility = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<void, unknown, DeleteAdminFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId }) =>
      deleteAdminFacility(agencyId, hotelId, facilityId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.adminList(
          variables.agencyId,
          variables.hotelId
        ),
      })

      toast.success(t("facilities.toast.deleted", "Facility deleted successfully"))
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, t("facilities.toast.deleteFailed", "Failed to delete facility")))
    },
  })
}
