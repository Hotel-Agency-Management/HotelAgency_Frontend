'use client'
import { useAuth } from '@/core/context/AuthContext'
import { useHotelStore } from '../hooks/useHotelStore'
import { HotelFormPage } from '../components/HotelFormPage'

export default function Page() {
  const { user } = useAuth()
  const { addHotel, updateHotel, isLoading } = useHotelStore(user?.agencyId)
  return (
    <HotelFormPage
      mode="add"
      hotelsPath="/agency/hotels"
      addHotel={addHotel}
      updateHotel={updateHotel}
      isLoading={isLoading}
    />
  )
}
