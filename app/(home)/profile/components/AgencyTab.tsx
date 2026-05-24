import { Grid } from '@mui/material'
import { Building2, Phone, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ProfileAgencyData } from '../types/profile'
import { ProfileDetailsCard } from './ProfileDetailsCard'
import LtrText from '@/components/ui/LtrText'

interface AgencyTabProps {
  data: ProfileAgencyData
}

export function AgencyTab({ data }: AgencyTabProps) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <ProfileDetailsCard
          title={t('profile.tabs.agencyInformation', 'Agency Information')}
          items={[
            {
              label: t('profile.form.agencyName', 'Agency Name'),
              value: data.name,
              icon: <Building2 size={16} />,
            },
            {
              label: t('profile.form.phoneNumber', 'Phone Number'),
              value: <LtrText>{data.phone}</LtrText>,
              icon: <Phone size={16} />,
            },
            {
              label: t('profile.form.city', 'City'),
              value: data.city,
              icon: <MapPin size={16} />,
            },
          ]}
        >
        </ProfileDetailsCard>
      </Grid>
    </Grid>
  )
}
