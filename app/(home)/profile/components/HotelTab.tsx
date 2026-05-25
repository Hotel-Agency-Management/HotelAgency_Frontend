import { Building2, Globe, Hotel, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ProfileHotelData } from '../types/profile'
import { ProfileDetailsCard } from './ProfileDetailsCard'
import Grid from '@mui/material/Grid'
import LtrText from '@/components/ui/LtrText'

interface HotelTabProps {
  data: ProfileHotelData
}

export function HotelTab({ data }: HotelTabProps) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <ProfileDetailsCard
          title={t('profile.tabs.hotelInformation', { defaultValue: 'Hotel Information' })}
          items={[
            {
              label: t('profile.form.hotelName', { defaultValue: 'Hotel Name' }),
              value: data.name,
              icon: <Hotel size={16} />
            },
            {
              label: t('profile.form.phoneNumber', { defaultValue: 'Phone Number' }),
              value: <LtrText>{data.phone}</LtrText>,
              icon: <Phone size={16} />
            },
            {
              label: t('profile.form.city', { defaultValue: 'City' }),
              value: data.city,
              icon: <Building2 size={16} />
            },
            {
              label: t('profile.form.country', { defaultValue: 'Country' }),
              value: data.country ?? '—',
              icon: <Globe size={16} />
            }
          ]}
        ></ProfileDetailsCard>
      </Grid>
    </Grid>
  )
}
