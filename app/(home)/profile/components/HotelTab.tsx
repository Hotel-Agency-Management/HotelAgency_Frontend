import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import { BadgeCheck, Building2, CircleDollarSign, Hotel, MapPin, Phone } from 'lucide-react'
import type { ProfileHotelData } from '../types/profile'
import { ProfileDetailsCard } from './ProfileDetailsCard'

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
              label: 'Address',
              value: data.address,
              icon: <MapPin size={16} />,
            },
            {
              label: 'Currency',
              value: data.currency,
              icon: <CircleDollarSign size={16} />,
            },
            {
              label: 'Status',
              value: data.status,
              icon: <BadgeCheck size={16} />,
            },
          ]}
        >
          {/* <Stack spacing={1.5}>
            <Typography variant='subtitle2' fontWeight={600}>
              Brand Colors
            </Typography> */}

            {/* {data.brandColors.length ? (
              <Stack direction='row' flexWrap='wrap' gap={1.5}>
                {data.brandColors.map((color) => (
                  <Chip
                    key={color}
                    variant='outlined'
                    label={
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                          }}
                        />
                        <span>{color}</span>
                      </Stack>
                    }
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant='body2' color='text.secondary'>
                No hotel branding colors are assigned to this profile.
              </Typography>
            )} */}
          {/* </Stack> */}
        </ProfileDetailsCard>
      </Grid>
    </Grid>
  )
}
