import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { adminCreateHotel, adminUpdateHotel } from '../../clients/adminHotelClient'
import { CreateHotelVariables, UpdateHotelVariables } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { adminHotelQueryKeys } from '../queries/useAdminHotelQueries'

export const useAdminCreateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, unknown, CreateHotelVariables>({
    mutationFn: async ({ agencyId, data }) => {
      const hotel = await adminCreateHotel(agencyId, data)
      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminHotelQueryKeys.list(variables.agencyId),
      })
      toast.success('Hotel created successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to create hotel'))
    },
  })
}

export const useAdminUpdateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, unknown, UpdateHotelVariables>({
    mutationFn: async ({ agencyId, hotelId, data }) => {
      const hotel = await adminUpdateHotel(agencyId, hotelId, data)
      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminHotelQueryKeys.list(variables.agencyId),
      })
      queryClient.invalidateQueries({
        queryKey: adminHotelQueryKeys.detail(variables.agencyId, variables.hotelId),
      })
      toast.success('Hotel updated successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to update hotel'))
    },
  })
}
