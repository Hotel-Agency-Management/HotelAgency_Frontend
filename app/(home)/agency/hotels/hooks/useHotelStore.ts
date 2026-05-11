import { useGetHotels, useGetHotelById } from './queries/useHotelQueries'
import { useCreateHotel, useUpdateHotel } from './mutations/useHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'
import type { HotelListParams } from '../configs/hotelConfig'

export const useHotelStore = (agencyId?: number, hotelId?: number, params?: HotelListParams) => {
  const { data: hotelData, isLoading: isLoadingList } = useGetHotels(params)
  const { data: hotel, isLoading: isLoadingDetail } = useGetHotelById(hotelId)

  const { mutateAsync: createHotel, isPending: isAdding } = useCreateHotel()
  const { mutateAsync: updateHotel, isPending: isUpdating } = useUpdateHotel()

  const hotels = hotelData?.items ?? []

  return {
    hotels,
    hotel,
    isLoading: isLoadingList || isLoadingDetail || isAdding || isUpdating,
    totalCount: hotelData?.totalCount ?? 0,
    totalPages: hotelData?.totalPages ?? 1,

    addHotel: (formValues: HotelFormValues) =>
      createHotel({
        agencyId: agencyId!,
        data: {
          ...mapHotelFormValuesToHotelBase(formValues),
          logo: formValues.branding.logo as unknown as File | null,
          coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
        },
      }),

    updateHotel: (hotelId: string, formValues: HotelFormValues) =>
      updateHotel({
        agencyId: agencyId!,
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
