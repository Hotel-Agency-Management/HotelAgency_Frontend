import { Grid, Stack, Typography } from '@mui/material'
import { Building2, Phone, MapPin } from 'lucide-react'
import type { ProfileAgencyData } from '../types/profile'
import { ProfileDetailsCard } from './ProfileDetailsCard'

interface AgencyTabProps {
  data: ProfileAgencyData
}

export function AgencyTab({ data }: AgencyTabProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <ProfileDetailsCard
          title='Agency Information'
          items={[
            {
              label: 'Agency Name',
              value: data.name,
              icon: <Building2 size={16} />,
            },
            {
              label: 'Phone Number',
              value: data.phone,
              icon: <Phone size={16} />,
            },
            {
              label: 'City',
              value: data.city,
              icon: <MapPin size={16} />,
            },
          ]}
        >
          <Stack spacing={1.5}>
            <Typography variant='subtitle2' fontWeight={600}>
              Uploaded Files
            </Typography>
          </Stack>
        </ProfileDetailsCard>
      </Grid>
    </Grid>
  )
}
