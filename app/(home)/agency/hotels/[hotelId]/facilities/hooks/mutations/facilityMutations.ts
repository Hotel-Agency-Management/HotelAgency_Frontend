import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import {
  createFacility,
  updateFacility,
  deleteFacility,
} from "../../clients/facilityClient"
import type {
  FacilityResponse,
  CreateFacilityVariables,
  UpdateFacilityVariables,
  DeleteFacilityVariables,
} from "../../configs/facilityConfig"
import { facilityQueryKeys } from "../queries/facilityQueries"
import { getErrorMessage } from "@/core/utils/apiError"

export const useCreateFacility = () => {
  const queryClient = useQueryClient()

  return useMutation<FacilityResponse, unknown, CreateFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, data }) =>
      createFacility(agencyId, hotelId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.agencyId, variables.hotelId),
      })

      toast.success("Facility created successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to create facility"))
    },
  })
}

export const useUpdateFacility = () => {
  const queryClient = useQueryClient()

  return useMutation<FacilityResponse, unknown, UpdateFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId, data }) =>
      updateFacility(agencyId, hotelId, facilityId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.agencyId, variables.hotelId),
      })

      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.detail(
          variables.agencyId,
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success("Facility updated successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update facility"))
    },
  })
}

export const useDeleteFacility = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, DeleteFacilityVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId }) =>
      deleteFacility(agencyId, hotelId, facilityId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityQueryKeys.list(variables.agencyId, variables.hotelId),
      })

      toast.success("Facility deleted successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete facility"))
    },
  })
}
