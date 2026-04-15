import { useGetHotels, useGetHotelById } from './queries/useHotelQueries'
import { useCreateHotel, useUpdateHotel, useDeleteHotel } from './mutations/useHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'

export const useHotelStore = (agencyId?: number, hotelId?: number) => {
  const { data: hotels = [], isLoading: isLoadingList } = useGetHotels(agencyId)
  const { data: hotel, isLoading: isLoadingDetail } = useGetHotelById(agencyId, hotelId)

  const { mutateAsync: createHotel, isPending: isAdding } = useCreateHotel()
  const { mutateAsync: updateHotel, isPending: isUpdating } = useUpdateHotel()
  const { mutateAsync: deleteHotel, isPending: isDeleting } = useDeleteHotel()

  return {
    hotels,
    hotel,
    isLoading: isLoadingList || isLoadingDetail || isAdding || isUpdating || isDeleting,

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

    deleteHotel: (hotelId: string) =>
      deleteHotel({ agencyId: agencyId!, hotelId: Number(hotelId) }),

    getHotelById: (id: string) => hotels.find(h => h.id === id),
  }
}
