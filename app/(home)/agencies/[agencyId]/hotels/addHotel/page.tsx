'use client'
import { useParams } from 'next/navigation'
import { useAdminHotelFormActions } from '@/app/(home)/agency/hotels/hooks/useAdminHotelFormActions'
import { HotelFormPage } from '@/app/(home)/agency/hotels/components/HotelFormPage'

export default function Page() {
  const { agencyId } = useParams<{ agencyId: string }>()
  const { isLoading, addHotel, updateHotel } = useAdminHotelFormActions(Number(agencyId))
  return (
    <HotelFormPage
      mode="add"
      hotelsPath={`/agencies/${agencyId}/hotels`}
      addHotel={addHotel}
      updateHotel={updateHotel}
      isLoading={isLoading}
    />
  )
}
