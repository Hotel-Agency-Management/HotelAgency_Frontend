'use client'

import { useRef } from 'react'
import {
  Box, Card, IconButton, Stack, Tooltip, Typography, useTheme
} from '@mui/material'
import { Calendar, MapPin } from 'lucide-react'
import { Icon } from '@iconify/react'
import { FadeIn, StaggerGroup, StaggerItem, TextReveal } from '@/components/animation'
import Avatar from '@/components/ui/Avatar'
import type { ProfileHeroData } from '../types/profile'

interface HeroCardProps {
  data: ProfileHeroData
}

export function HeroCard({ data }: HeroCardProps) {
  const theme = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = data.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <FadeIn direction='up' distance={16} transition={{ duration: 0.3 }}>
      <Card sx={{ p: 0, overflow: 'hidden' }}>
        <Box
          sx={{
            height: 140,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}45 0%, ${theme.palette.secondary.main}45 100%)`
          }}
        />
        <Stack p={3}>
          <FadeIn direction='up' distance={14} transition={{ delay: 0.08, duration: 0.22 }}>
            <Box>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
              />
              <Avatar variant='profileLarge'>
                {initials}
              </Avatar>
            </Box>
          </FadeIn>

          <TextReveal
            text={data.name}
            as='h5'
            splitBy='word'
            staggerDelay={0.06}
            delayChildren={0.18}
            duration={0.28}
            style={{ fontWeight: 700, fontSize: '1.5rem' }}
          />

          <FadeIn direction='up' distance={8} transition={{ delay: 0.28, duration: 0.18 }}>
            <Typography variant='body2' color='text.secondary'>
              {data.title}
            </Typography>
          </FadeIn>

          <TextReveal
            text={data.bio}
            as='p'
            splitBy='word'
            staggerDelay={0.02}
            delayChildren={0.25}
            duration={0.42}
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: theme.palette.text.secondary,
              maxWidth: 540
            }}
          />

          <FadeIn direction='up' distance={8} transition={{ delay: 0.54, duration: 0.18 }}>
            <Stack direction='row' flexWrap='wrap' gap={2.5} color='text.secondary'>
              <Stack direction='row' alignItems='center' gap={0.75}>
                <MapPin size={14} />
                <Typography variant='caption'>{data.location}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' gap={0.75}>
                <Calendar size={14} />
                <Typography variant='caption'>Joined {data.joinedDate}</Typography>
              </Stack>
            </Stack>
          </FadeIn>

          <StaggerGroup
            staggerDelay={0.06}
            delayChildren={0.32}
            direction='up'
            distance={10}
            duration={0.28}
            style={{ display: 'flex', gap: '4px' }}
          >
            <StaggerItem style={{ display: 'inline-flex' }}>
              <Tooltip title={`github.com/${data.social.github}`}>
                <IconButton size='small'><Icon icon='mdi:github' width={16} /></IconButton>
              </Tooltip>
            </StaggerItem>
            <StaggerItem style={{ display: 'inline-flex' }}>
              <Tooltip title={`linkedin.com/in/${data.social.linkedin}`}>
                <IconButton size='small'><Icon icon='mdi:linkedin' width={16} /></IconButton>
              </Tooltip>
            </StaggerItem>
            <StaggerItem style={{ display: 'inline-flex' }}>
              <Tooltip title={`@${data.social.twitter}`}>
                <IconButton size='small'><Icon icon='mdi:twitter' width={16} /></IconButton>
              </Tooltip>
            </StaggerItem>
            <StaggerItem style={{ display: 'inline-flex' }}>
              <Tooltip title={data.social.website}>
                <IconButton size='small'><Icon icon='mdi:web' width={16} /></IconButton>
              </Tooltip>
            </StaggerItem>
          </StaggerGroup>
        </Stack>
      </Card>
    </FadeIn>
  )
}
