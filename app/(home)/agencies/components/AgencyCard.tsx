import { Avatar, Box, Card, CardActionArea, Divider, Stack, Typography } from '@mui/material'
import Icon from '@/components/icon/Icon'
import AgencyStatusChip from './AgencyStatusChip'
import { Agency } from '../types/agency'
import { fromNow } from '@/core/utils/Dateutils'
import { PLAN_NAMES } from '../constants/agencyConstants'

interface Props {
  agency: Agency
  onClick: (id: number) => void
}

export default function AgencyCard({ agency, onClick }: Props) {
  return (
    <Card variant='outlined'>
      <CardActionArea onClick={() => onClick(agency.id)} sx={{ borderRadius: 'inherit', overflow: 'visible' }}>
        <Stack gap={2}>

          <Stack direction='row' alignItems='flex-start' justifyContent='space-between' gap={1}>
            <Stack direction='row' alignItems='center' gap={1.5} sx={{ minWidth: 0 }}>
              <Avatar
                src={agency.logo_url}
                alt={agency.name}
                sx={{ width: 40, height: 40, bgcolor: agency.primary_color, flexShrink: 0 }}
              >
                {agency.name[0].toUpperCase()}
              </Avatar>
              <Stack gap={0.5} sx={{ minWidth: 0 }}>
                <Typography variant='body1' fontWeight={600} noWrap>
                  {agency.name}
                </Typography>
                <Typography variant='caption' color='text.secondary' noWrap>
                  {agency.email}
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ flexShrink: 0 }}>
            <AgencyStatusChip status={agency.status} />
          </Box>
          </Stack>

          <Divider />
          <Stack gap={1}>
            <Stack direction='row' alignItems='center' gap={1}>
              <Icon icon='lucide:phone' width={15} height={15} color='gray' />
              <Typography variant='caption' color='text.secondary'>
                {agency.phone}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1}>
              <Icon icon='lucide:map-pin' width={15} height={15} color='gray' />
              <Typography variant='caption' color='text.secondary'>
                {agency.city}, {agency.country}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1}>
              <Icon icon={agency.email_verified ? 'lucide:shield-check' : 'lucide:shield-x'} width={15} height={15} color={agency.email_verified ? 'green' : 'red'} />
              <Typography variant='caption' color={agency.email_verified ? 'success.main' : 'error.main'}>
                {agency.email_verified ? 'Email Verified' : 'Not Verified'}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='caption' color='text.secondary'>
              Created {fromNow(agency.created_at)}
            </Typography>
            <Stack direction='row' alignItems='center' gap={0.5}>
              <Icon icon='lucide:tag' width={14} height={14} color='gray' />
              <Typography variant='caption' color='text.secondary'>
                {PLAN_NAMES[agency.plan_id] ?? `#${agency.plan_id}`}
              </Typography>
            </Stack>
          </Stack>

        </Stack>
      </CardActionArea>
    </Card>
  )
}
