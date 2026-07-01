import { Box, Stack, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const ChatOrb = styled(Box, {
  shouldForwardProp: prop => prop !== 'orbSize',
})<{ orbSize: number }>(({ theme, orbSize }) => ({
  width: orbSize,
  height: orbSize,
  borderRadius: '50%',
  flexShrink: 0,
  background: `radial-gradient(circle at 30% 30%, ${alpha(theme.palette.primary.light, 0.9)}, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark})`,
  boxShadow: `0 0 ${orbSize * 0.7}px ${alpha(theme.palette.primary.main, 0.45)}`,
}))

export const WelcomeScreenRoot = styled(Stack)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

export const MessageMeta = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.25),
  color: theme.palette.text.secondary,
  opacity: 0.7,
}))
