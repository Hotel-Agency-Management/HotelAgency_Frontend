'use client'
import { useParams } from 'next/navigation'
import { useAdminHotelStore } from '@/app/(home)/agency/hotels/hooks/useAdminHotelStore'
import { HotelFormPage } from '@/app/(home)/agency/hotels/components/HotelFormPage'

export default function Page() {
  const { agencyId } = useParams<{ agencyId: string }>()
  const numericAgencyId = Number(agencyId)
  const { addHotel, updateHotel, isLoading } = useAdminHotelStore(numericAgencyId)
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
