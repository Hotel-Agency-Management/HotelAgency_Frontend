import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type {
  FacilityPhotoResponse,
  UploadFacilityPhotoVariables,
  DeleteFacilityPhotoVariables,
  UploadAdminFacilityPhotoVariables,
  DeleteAdminFacilityPhotoVariables,
} from "../../configs/facilityPhotosConfig"
import { facilityPhotoQueryKeys } from "../../constants/facilityPhotoQueryKeys"
import { getErrorMessage } from "@/core/utils/apiError"
import { uploadFacilityPhoto, deleteFacilityPhoto } from "../../clients/facilityPhotoClient"
import {
  uploadAdminFacilityPhoto,
  deleteAdminFacilityPhoto,
} from "../../clients/adminFacilityPhotoClient"

export const useUploadFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FacilityPhotoResponse,
    unknown,
    UploadFacilityPhotoVariables
  >({
    mutationFn: ({ hotelId, facilityId, file }) =>
      uploadFacilityPhoto(hotelId, facilityId, file),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.list(
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success("Photo uploaded successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload photo"))
    },
  })
}

export const useDeleteFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, DeleteFacilityPhotoVariables>({
    mutationFn: ({ hotelId, facilityId, photoId }) =>
      deleteFacilityPhoto(hotelId, facilityId, photoId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.list(
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success("Photo deleted successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete photo"))
    },
  })
}

export const useUploadAdminFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FacilityPhotoResponse,
    unknown,
    UploadAdminFacilityPhotoVariables
  >({
    mutationFn: ({ agencyId, hotelId, facilityId, file }) =>
      uploadAdminFacilityPhoto(agencyId, hotelId, facilityId, file),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.adminList(
          variables.agencyId,
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success("Photo uploaded successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to upload photo"))
    },
  })
}

export const useDeleteAdminFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, DeleteAdminFacilityPhotoVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId, photoId }) =>
      deleteAdminFacilityPhoto(agencyId, hotelId, facilityId, photoId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.adminList(
          variables.agencyId,
          variables.hotelId,
          variables.facilityId
        ),
      })

      toast.success("Photo deleted successfully")
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to delete photo"))
    },
  })
}
