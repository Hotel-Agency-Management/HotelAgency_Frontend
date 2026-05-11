import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createHotel, updateHotel } from '../../clients/hotelClient'
import { CreateHotelVariables, UpdateHotelVariables } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { hotelQueryKeys } from '../queries/useHotelQueries'


export const useCreateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, unknown, CreateHotelVariables>({
    mutationFn: async ({ data }) => {
      const hotel = await createHotel(data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.lists(variables.agencyId)
      })
      toast.success('Hotel created successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to create hotel'))
    }
  })
}

export const useUpdateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, unknown, UpdateHotelVariables>({
    mutationFn: async ({ hotelId, data }) => {
      const hotel = await updateHotel(hotelId, data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.lists(variables.agencyId)
      })
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.detail(variables.agencyId, variables.hotelId)
      })
      toast.success('Hotel updated successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to update hotel'))
    }
  })
}
