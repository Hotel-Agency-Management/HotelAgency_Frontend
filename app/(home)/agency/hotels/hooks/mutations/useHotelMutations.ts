import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { createHotel, updateHotel } from '../../clients/hotelClient'
import { CreateHotelVariables, UpdateHotelVariables } from '../../configs/hotelConfig'
import type { Hotel } from '../../types/hotel'
import { mapHotelResponseToHotel } from '../../utils/hotelMapper'
import { hotelQueryKeys } from '../queries/useHotelQueries'

export const useCreateHotel = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<Hotel, unknown, CreateHotelVariables>({
    mutationFn: async ({ data }) => {
      const hotel = await createHotel(data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.lists(variables.agencyId)
      })
      toast.success(t('agencyHotels.toast.created', { defaultValue: 'Hotel created successfully' }))
    },
    onError: error => {
      toast.error(
        getErrorMessage(error, t('agencyHotels.toast.createFailed', { defaultValue: 'Failed to create hotel' }))
      )
    }
  })
}

export const useUpdateHotel = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<Hotel, unknown, UpdateHotelVariables>({
    mutationFn: async ({ hotelId, data }) => {
      const hotel = await updateHotel(hotelId, data)

      return mapHotelResponseToHotel(hotel)
    },
    onSuccess: (hotel, variables) => {
      queryClient.setQueryData(hotelQueryKeys.detail(variables.agencyId, variables.hotelId), hotel)
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.lists(variables.agencyId)
      })
      queryClient.invalidateQueries({
        queryKey: hotelQueryKeys.detail(variables.agencyId, variables.hotelId)
      })
      toast.success(t('agencyHotels.toast.updated', { defaultValue: 'Hotel updated successfully' }))
    },
    onError: error => {
      toast.error(
        getErrorMessage(error, t('agencyHotels.toast.updateFailed', { defaultValue: 'Failed to update hotel' }))
      )
    }
  })
}
