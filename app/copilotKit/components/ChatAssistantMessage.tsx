'use client'

import { useState, type ComponentProps } from 'react'
import { Stack } from '@mui/material'
import { CopilotChatAssistantMessage } from '@copilotkit/react-core/v2'
import { useRelativeTime } from '../hooks/useRelativeTime'
import { MessageMeta } from '../styles/StyledComponents'

export function ChatAssistantMessage(props: ComponentProps<typeof CopilotChatAssistantMessage>) {
  const [receivedAt] = useState(() => new Date())
  const relativeTime = useRelativeTime(receivedAt)

  return (
    <Stack gap={0.5} alignItems="flex-start" px={2}>
      <CopilotChatAssistantMessage {...props} />
      <MessageMeta variant="caption">{relativeTime}</MessageMeta>
    </Stack>
  )
}
