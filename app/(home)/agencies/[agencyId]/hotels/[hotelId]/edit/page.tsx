'use client'
import { useParams } from 'next/navigation'
import { useAdminGetHotelById } from '@/app/(home)/agency/hotels/hooks/queries/useAdminHotelQueries'
import { useAdminHotelFormActions } from '@/app/(home)/agency/hotels/hooks/useAdminHotelFormActions'
import { HotelFormPage } from '@/app/(home)/agency/hotels/components/HotelFormPage'

export default function Page() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>()
  const { data: hotel, isLoading: isLoadingDetail } = useAdminGetHotelById(Number(agencyId), Number(hotelId))
  const { isLoading: isSubmitting, addHotel, updateHotel } = useAdminHotelFormActions(Number(agencyId))
  return (
    <HotelFormPage
      mode="edit"
      hotelsPath={`/agencies/${agencyId}/hotels`}
      addHotel={addHotel}
      updateHotel={updateHotel}
      hotel={hotel}
      isLoading={isLoadingDetail || isSubmitting}
    />
  )
}
