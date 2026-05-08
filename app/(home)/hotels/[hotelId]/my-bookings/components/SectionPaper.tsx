'use client'

import { Divider, Stack, Typography } from '@mui/material'
import Icon from '@/components/icon/Icon'
import { BookingSectionIconBadge, BookingSectionPaper } from '../styles/StyledComponents'

interface SectionPaperProps {
  icon: string
  title: string
  children: React.ReactNode
}

export function SectionPaper({ icon, title, children }: SectionPaperProps) {
  return (
    <BookingSectionPaper variant="outlined">
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1} alignItems="center">
          <BookingSectionIconBadge>
            <Icon icon={icon} fontSize={16} color="white" />
          </BookingSectionIconBadge>
          <Typography variant="subtitle2" fontWeight={700}>
            {title}
          </Typography>
        </Stack>
        <Divider />
        <Stack spacing={1}>
          {children}
        </Stack>
      </Stack>
    </BookingSectionPaper>
  )
}
