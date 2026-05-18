import { useAuth } from '@/core/context/AuthContext'
import { useCreateHotel, useUpdateHotel } from './mutations/useHotelMutations'
import { mapHotelFormValuesToHotelBase } from '../utils/hotelMapper'
import type { HotelFormValues } from '../types/hotel'

export const useHotelFormActions = () => {
  const { user } = useAuth()
  const { mutateAsync: createHotel, isPending: isAdding } = useCreateHotel()
  const { mutateAsync: updateHotelMutation, isPending: isUpdating } = useUpdateHotel()

  const addHotel = (formValues: HotelFormValues) =>
    createHotel({
      agencyId: user?.agencyId!,
      data: {
        ...mapHotelFormValuesToHotelBase(formValues),
        logo: formValues.branding.logo as unknown as File | null,
        coverPhoto: formValues.basicInfo.coverImage as unknown as File | null,
      },
    })

  const updateHotel = (id: string, formValues: HotelFormValues) =>
    updateHotelMutation({
      agencyId: user?.agencyId!,
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
