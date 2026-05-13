import { Building2, Globe, Hotel, Phone } from 'lucide-react'
import type { ProfileHotelData } from '../types/profile'
import { ProfileDetailsCard } from './ProfileDetailsCard'
import Grid from '@mui/material/Grid'

interface HotelTabProps {
  data: ProfileHotelData
}

export function HotelTab({ data }: HotelTabProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <ProfileDetailsCard
          title='Hotel Information'
          items={[
            {
              label: 'Hotel Name',
              value: data.name,
              icon: <Hotel size={16} />,
            },
            {
              label: 'Phone Number',
              value: data.phone,
              icon: <Phone size={16} />,
            },
            {
              label: 'City',
              value: data.city,
              icon: <Building2 size={16} />,
            },
            {
              label: 'Country',
              value: data.country ?? '—',
              icon: <Globe size={16} />,
            },
          ]}
        >
        </ProfileDetailsCard>
      </Grid>
    </Grid>
  )
}
