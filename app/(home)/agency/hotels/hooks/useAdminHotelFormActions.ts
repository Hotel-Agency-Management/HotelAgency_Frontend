import { useAdminCreateHotel, useAdminUpdateHotel } from './mutations/useAdminHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'

export const useAdminHotelFormActions = (agencyId: number) => {
  const { mutateAsync: createHotel, isPending: isAdding } = useAdminCreateHotel()
  const { mutateAsync: updateHotelMutation, isPending: isUpdating } = useAdminUpdateHotel()

  const addHotel = (formValues: HotelFormValues) =>
    createHotel({
      agencyId,
      data: {
        ...mapHotelFormValuesToHotelBase(formValues),
        logo: formValues.branding.logo as unknown as File | null,
        coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
      },
    })

  const updateHotel = (id: string, formValues: HotelFormValues) =>
    updateHotelMutation({
      agencyId,
      hotelId: Number(id),
      data: {
        ...mapHotelFormValuesToHotelBase(formValues),
        logo: formValues.branding.logo as unknown as File | null,
        coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
      },
    })

  return {
    isLoading: isAdding || isUpdating,
    addHotel,
    updateHotel,
  }
}
