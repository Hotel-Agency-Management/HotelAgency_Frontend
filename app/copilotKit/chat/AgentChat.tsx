'use client'

import { CopilotSidebar } from "@copilotkit/react-core/v2"
import { Box, useTheme } from "@mui/material"
import { getCopilotThemeVars } from "../theme/copilotTheme"

export function AgentChat() {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  const copilotStyles = getCopilotThemeVars({
    primary: theme.palette.primary.main,
    isDark,
  })

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 2000
      }}
      style={copilotStyles}
    >
      <CopilotSidebar
        defaultOpen={false}
        labels={{
          modalHeaderTitle: "Ask me",
          welcomeMessageText: "Hi! How can I help you?",
          chatInputPlaceholder: "Type a message...",
        }}
      />
    </Box>
  )
}
