import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import { Avatar, Box, Card, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import themeConfig from '@/core/configs/themeConfig'

export const LogCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: themeConfig.borderRadius * 1.5,
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',

  '&:hover': {
    borderColor: theme.palette.primary.light,
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)'
  }
}))

export const FiltersCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: themeConfig.borderRadius * 1.5,
  backgroundColor: hexToRGBA(theme.palette.primary.main, 0.03),
  border: `1px solid ${theme.palette.divider}`
}))

export const DateGroupHeader = styled(Box)(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: 700,
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: theme.spacing(1.5, 0, 0.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  '&::after': {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: theme.palette.divider
  }
}))

export const ActionTypeAvatar = styled(Avatar, {
  shouldForwardProp: prop => prop !== '$color'
})<{ $color: string }>(({ theme, $color }) => ({
  backgroundColor: hexToRGBA($color, 0.12),
  flexShrink: 0,
  width: theme.spacing(5),
  height: theme.spacing(5)
}))

export const SummaryCard = styled(Card, {
  shouldForwardProp: prop => prop !== '$color'
})<{ $color: string }>(({ theme, $color }) => ({
  padding: theme.spacing(2.5),
  borderRadius: themeConfig.borderRadius * 1.5,
  borderColor: theme.palette.divider,
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    height: 4,
    backgroundColor: $color
  }
}))

export const SummaryIconBadge = styled(Stack, {
  shouldForwardProp: prop => prop !== '$color'
})<{ $color: string }>(({ theme, $color }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(5),
  height: theme.spacing(5),
  borderRadius: themeConfig.borderRadius,
  backgroundColor: hexToRGBA($color, 0.12),
  color: $color,
  flexShrink: 0
}))
