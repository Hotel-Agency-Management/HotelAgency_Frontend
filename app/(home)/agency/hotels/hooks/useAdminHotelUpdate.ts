import { useAdminUpdateHotel } from './mutations/useAdminHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'

export const useAdminHotelUpdate = (agencyId: number, hotelId?: number) => {
  const { mutateAsync: updateHotelMutation, isPending: isUpdating } = useAdminUpdateHotel()

  return {
    isLoading: isUpdating,
    updateHotel: (formValues: HotelFormValues) =>
      updateHotelMutation({
        agencyId,
        hotelId: hotelId!,
        data: {
          ...mapHotelFormValuesToHotelBase(formValues),
          logo: formValues.branding.logo as unknown as File | null,
          coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
        },
      }),
  }
}
