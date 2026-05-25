import Alert from '@mui/material/Alert'
import { useTranslation } from 'react-i18next'
import { CustomThemeTab } from '@/app/(home)/agency/components/theme/CustomThemeTab'
import { HotelProfileTab } from '@/app/(home)/agency/hotels/components/hotelProfile/HotelProfileTab'
import type { Hotel, HotelFormValues } from '@/app/(home)/agency/hotels/types/hotel'
import type { BrandingSettings } from '@/core/theme/palette/branding'

interface AdminHotelSettingsContentProps {
  activeTab: string
  hotel: Hotel | undefined
  isLoading: boolean
  onSave: (data: HotelFormValues) => Promise<void> | void
  onThemeSave: (branding: BrandingSettings) => Promise<void> | void
}

export function AdminHotelSettingsContent({
  activeTab,
  hotel,
  isLoading,
  onSave,
  onThemeSave
}: AdminHotelSettingsContentProps) {
  const { t } = useTranslation()

  if (isLoading && !hotel)
    return (
      <Alert severity='info'>
        {t('hotelSettings.profile.loadingSettings', { defaultValue: 'Loading hotel settings...' })}
      </Alert>
    )
  if (!hotel)
    return <Alert severity='error'>{t('hotelSettings.profile.notFound', { defaultValue: 'Hotel not found.' })}</Alert>

  return activeTab === 'profile' ? (
    <HotelProfileTab defaultValues={hotel} onSave={onSave} isLoading={isLoading} isActive={hotel.isActive} />
  ) : (
    <CustomThemeTab initialValues={hotel.branding} onSave={onThemeSave} />
  )
}
