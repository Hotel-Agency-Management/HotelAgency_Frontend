'use client'
import { useParams } from 'next/navigation'
import { useAdminHotelStore } from '@/app/(home)/agency/hotels/hooks/useAdminHotelStore'
import { HotelFormPage } from '@/app/(home)/agency/hotels/components/HotelFormPage'

export default function Page() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>()
  const numericAgencyId = Number(agencyId)
  const numericHotelId = Number(hotelId)
  const { addHotel, updateHotel, hotel, isLoading } = useAdminHotelStore(numericAgencyId, numericHotelId)
  return (
    <HotelFormPage
      mode="edit"
      hotelsPath={`/agencies/${agencyId}/hotels`}
      addHotel={addHotel}
      updateHotel={updateHotel}
      hotel={hotel}
      isLoading={isLoading}
    />
  )
}
