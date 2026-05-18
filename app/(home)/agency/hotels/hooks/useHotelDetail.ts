import { useUpdateHotel } from './mutations/useHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'
import { useAuth } from '@/core/context/AuthContext'

export const useHotelDetail = (hotelId?: number) => {
  const { user } = useAuth()
  const { mutateAsync: updateHotelMutation, isPending: isUpdating } = useUpdateHotel()

  return {
    isLoading: isUpdating,
    updateHotel: (formValues: HotelFormValues) =>
      updateHotelMutation({
        agencyId: user?.agencyId!,
        hotelId: hotelId!,
        data: {
          ...mapHotelFormValuesToHotelBase(formValues),
          logo: formValues.branding.logo as unknown as File | null,
          coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
        },
      }),
  }
}
