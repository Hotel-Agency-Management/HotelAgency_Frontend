import { useState } from 'react'
import { Avatar, Card, CardActionArea, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Icon from '@/components/icon/Icon'
import { Agency } from '../types/agency'
import { fromNow } from '@/core/utils/Dateutils'

interface Props {
  agency: Agency
  onClick: (agencyId: number) => void
  onSettingsClick?: (agencyId: number) => void
}

export default function AgencyCard({ agency, onClick, onSettingsClick }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <Card variant='outlined'>
      <CardActionArea onClick={() => onClick(agency.id)} sx={{ borderRadius: 'inherit', overflow: 'visible' }}>
        <Stack gap={2}>

          <Stack direction='row' alignItems='flex-start' justifyContent='space-between' gap={1}>
            <Stack direction='row' alignItems='center' gap={1.5} sx={{ minWidth: 0 }}>
              <Avatar
                src={agency.logoUrl ?? undefined}
                alt={agency.name}
                sx={{ width: 40, height: 40, flexShrink: 0 }}
              >
                {agency.name[0].toUpperCase()}
              </Avatar>
              <Stack gap={0.5} sx={{ minWidth: 0 }}>
                <Typography variant='body1' fontWeight={600} noWrap>
                  {agency.name}
                </Typography>
              </Stack>
            </Stack>
            {onSettingsClick && (
              <IconButton
                size='small'
                onClick={(e) => { e.stopPropagation(); setAnchorEl(e.currentTarget) }}
              >
                <MoreVertIcon fontSize='small' />
              </IconButton>
            )}
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => { onSettingsClick?.(agency.id); setAnchorEl(null) }}>
              Agency Settings
            </MenuItem>
          </Menu>

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
          </Stack>

          <Divider />

          <Typography variant='caption' color='text.secondary'>
            Created {fromNow(agency.createdAt)}
          </Typography>

        </Stack>
      </CardActionArea>
    </Card>
  )
}
