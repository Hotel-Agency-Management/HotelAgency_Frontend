'use client'
import { useParams } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { useHotelStore } from '../../hooks/useHotelStore'
import { HotelFormPage } from '../../components/HotelFormPage'

export default function Page() {
  const { user } = useAuth()
  const { hotelId } = useParams<{ hotelId: string }>()
  const { addHotel, updateHotel, hotel, isLoading } = useHotelStore(user?.agencyId, Number(hotelId))
  return (
    <HotelFormPage
      mode="edit"
      hotelsPath="/agency/hotels"
      addHotel={addHotel}
      updateHotel={updateHotel}
      hotel={hotel}
      isLoading={isLoading}
    />
  )
}
