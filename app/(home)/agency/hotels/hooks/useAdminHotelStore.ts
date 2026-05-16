import { useAdminGetHotels, useAdminGetHotelById } from './queries/useAdminHotelQueries'
import { useAdminCreateHotel, useAdminUpdateHotel } from './mutations/useAdminHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'
import type { HotelListParams } from '../configs/hotelConfig'

export const useAdminHotelStore = (agencyId: number, hotelId?: number, params?: HotelListParams) => {
  const { data: hotelData, isLoading: isLoadingList } = useAdminGetHotels(agencyId, params)
  const { data: hotel, isLoading: isLoadingDetail } = useAdminGetHotelById(agencyId, hotelId)

  const { mutateAsync: createHotel, isPending: isAdding } = useAdminCreateHotel()
  const { mutateAsync: updateHotel, isPending: isUpdating } = useAdminUpdateHotel()

  const hotels = hotelData?.items ?? []

  return {
    hotels,
    hotel,
    isLoading: isLoadingList || isLoadingDetail || isAdding || isUpdating,
    totalCount: hotelData?.totalCount ?? 0,
    totalPages: hotelData?.totalPages ?? 1,

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
