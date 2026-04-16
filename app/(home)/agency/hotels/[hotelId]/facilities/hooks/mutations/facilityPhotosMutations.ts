import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type {
  FacilityPhotoResponse,
  UploadFacilityPhotoVariables,
  DeleteFacilityPhotoVariables,
} from "../../configs/facilityPhotosConfig"
import { facilityPhotoQueryKeys } from "../queries/facilityPhotosQueries"
import { getErrorMessage } from "@/core/utils/apiError"
import { uploadFacilityPhoto, deleteFacilityPhoto } from "../../clients/facilityPhotoClient"

export const useUploadFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<
    FacilityPhotoResponse,
    unknown,
    UploadFacilityPhotoVariables
  >({
    mutationFn: ({ agencyId, hotelId, facilityId, file }) =>
      uploadFacilityPhoto(agencyId, hotelId, facilityId, file),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.list(
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

export const useDeleteFacilityPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, DeleteFacilityPhotoVariables>({
    mutationFn: ({ agencyId, hotelId, facilityId, photoId }) =>
      deleteFacilityPhoto(agencyId, hotelId, facilityId, photoId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: facilityPhotoQueryKeys.list(
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
