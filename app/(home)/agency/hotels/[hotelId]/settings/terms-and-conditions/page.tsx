'use client'

import { useParams } from 'next/navigation'
import Alert from '@mui/material/Alert'
import { useTranslation } from 'react-i18next'
import { useGetHotelById } from '../../../hooks/queries/useHotelQueries'
import { HotelSettingsShell } from '../../../components/hotelSettings/HotelSettingsShell'
import { HotelTermsSettingsView } from '@/app/(home)/agency/hotels/terms-and-conditions/components/HotelTermsSettingsView'

export default function HotelTermsConditionsPage() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const { t } = useTranslation()
  const numericHotelId = Number(hotelId)
  const { data: hotel, isLoading } = useGetHotelById(Number.isFinite(numericHotelId) ? numericHotelId : undefined)

  return (
    <HotelSettingsShell hotelId={hotelId}>
      {isLoading && !hotel ? (
        <Alert severity='info'>
          {t('hotelSettings.profile.loadingDetails', { defaultValue: 'Loading hotel details...' })}
        </Alert>
      ) : hotel ? (
        <HotelTermsSettingsView hotelId={hotelId} hotelName={hotel.basicInfo.name} />
      ) : (
        <Alert severity='error'>{t('hotelSettings.profile.notFound', { defaultValue: 'Hotel not found.' })}</Alert>
      )}
    </HotelSettingsShell>
  )
}
