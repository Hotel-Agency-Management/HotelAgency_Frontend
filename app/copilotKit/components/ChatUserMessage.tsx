'use client'

import { useState, type ComponentProps } from 'react'
import { Stack } from '@mui/material'
import { CopilotChatUserMessage } from '@copilotkit/react-core/v2'
import { useRelativeTime } from '../hooks/useRelativeTime'
import { MessageMeta } from '../styles/StyledComponents'

export function ChatUserMessage(props: ComponentProps<typeof CopilotChatUserMessage>) {
  const [sentAt] = useState(() => new Date())
  const relativeTime = useRelativeTime(sentAt)

  return (
    <Stack gap={0.5} alignItems="flex-end" px={2}>
      <CopilotChatUserMessage {...props} messageRenderer="hb-cpk-user-msg" />
      <MessageMeta variant="caption">{relativeTime}</MessageMeta>
    </Stack>
  )
}
