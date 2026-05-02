import { useAdminGetHotels, useAdminGetHotelById } from './queries/useAdminHotelQueries'
import { useAdminCreateHotel, useAdminUpdateHotel } from './mutations/useAdminHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'

export const useAdminHotelStore = (agencyId: number, hotelId?: number) => {
  const { data: hotels = [], isLoading: isLoadingList } = useAdminGetHotels(agencyId)
  const { data: hotel, isLoading: isLoadingDetail } = useAdminGetHotelById(agencyId, hotelId)

  const { mutateAsync: createHotel, isPending: isAdding } = useAdminCreateHotel()
  const { mutateAsync: updateHotel, isPending: isUpdating } = useAdminUpdateHotel()

  return {
    hotels,
    hotel,
    isLoading: isLoadingList || isLoadingDetail || isAdding || isUpdating,

    addHotel: (formValues: HotelFormValues) =>
      createHotel({
        agencyId,
        data: {
          ...mapHotelFormValuesToHotelBase(formValues),
          logo: formValues.branding.logo as unknown as File | null,
          coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
        },
      }),

    updateHotel: (hotelId: string, formValues: HotelFormValues) =>
      updateHotel({
        agencyId,
        hotelId: Number(hotelId),
        data: {
          ...mapHotelFormValuesToHotelBase(formValues),
          logo: formValues.branding.logo as unknown as File | null,
          coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
        },
      }),

    getHotelById: (id: string) => hotels.find(h => h.id === id),
  }
}
