import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createHotel, updateHotel, deleteHotel } from '../../clients/hotelClient'
import { CreateHotelVariables, DeleteHotelVariables, UpdateHotelVariables } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { hotelQueryKeys } from '../queries/useHotelQueries'


export const useCreateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, unknown, CreateHotelVariables>({
    mutationFn: async ({ agencyId, data }) => {
      const hotel = await createHotel(agencyId, data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.list(variables.agencyId)
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
    mutationFn: async ({ agencyId, hotelId, data }) => {
      const hotel = await updateHotel(agencyId, hotelId, data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.list(variables.agencyId)
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

export const useDeleteHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, DeleteHotelVariables>({
    mutationFn: ({ agencyId, hotelId }) => deleteHotel(agencyId, hotelId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.list(variables.agencyId)
      })
      toast.success('Hotel deleted successfully')
    },
    onError: error => {
      toast.error(getErrorMessage(error, 'Failed to delete hotel'))
    }
  })
}
