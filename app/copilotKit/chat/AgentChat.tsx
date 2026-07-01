'use client'

import { CopilotChatAssistantMessage, CopilotChatUserMessage, CopilotSidebar } from "@copilotkit/react-core/v2"
import { Box, GlobalStyles, useTheme } from "@mui/material"
import { getCopilotChatOverrides } from "../theme/copilotTheme"
import { ChatWelcomeScreen } from "../components/ChatWelcomeScreen"
import { ChatUserMessage } from "../components/ChatUserMessage"
import { ChatAssistantMessage } from "../components/ChatAssistantMessage"

export function AgentChat() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 2000
      }}
    >
      <GlobalStyles styles={getCopilotChatOverrides(theme)} />
      <CopilotSidebar
        defaultOpen={false}
        header="hb-cpk-header"
        toggleButton="hb-cpk-toggle"
        welcomeScreen={ChatWelcomeScreen}
        messageView={{
          // Cast: the slot type also requires the static sub-component members
          // (.Container, .MessageRenderer, etc.) that ship on the default
          // component. CopilotKit's slot resolver only ever calls this value
          // as a function component — it never reads those static members —
          // so the extra shape requirement is a TS-only formality.
          userMessage: ChatUserMessage as typeof CopilotChatUserMessage,
          assistantMessage: ChatAssistantMessage as typeof CopilotChatAssistantMessage,
        }}
        labels={{
          modalHeaderTitle: "Ask me",
          welcomeMessageText: "Hi! How can I help you?",
          chatInputPlaceholder: "Ask...",
        }}
      />
    </Box>
  )
}
