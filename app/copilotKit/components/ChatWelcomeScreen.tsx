'use client'

import type { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'
import { useAuth } from '@/core/context/AuthContext'
import { getTimeOfDayGreeting } from '../utils/greeting'
import { CHAT_ORB_SIZE_WELCOME } from '../constant/chat'
import { ChatOrb, WelcomeScreenRoot } from '../styles/StyledComponents'

interface ChatWelcomeScreenProps {
  input?: ReactNode
  suggestionView?: ReactNode
}

export function ChatWelcomeScreen({ input, suggestionView }: ChatWelcomeScreenProps) {
  const { user } = useAuth()
  const greeting = getTimeOfDayGreeting()

  return (
    <WelcomeScreenRoot>
      <Stack flex={1} alignItems="center" justifyContent="center" gap={3}>
        <ChatOrb orbSize={CHAT_ORB_SIZE_WELCOME} />
        <Stack alignItems="center" gap={0.5}>
          <Typography variant="h6" fontWeight={600} textAlign="center">
            {greeting}
            {user?.firstName ? `, ${user.firstName}` : ''}
          </Typography>
          <Typography variant="h6" fontWeight={600} color="primary.main" textAlign="center">
            How can I assist you today?
          </Typography>
        </Stack>
      </Stack>
      {suggestionView}
      {input}
    </WelcomeScreenRoot>
  )
}
