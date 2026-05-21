import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { hexToRGBA } from '@/core/utils/hex-to-rgba'
import type { AlertSeverity } from '../types/accountantDashboardTypes'

type SeverityPalette = Record<AlertSeverity, { main: string }>

export const StyledAlertCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'severity',
})<{ severity: AlertSeverity }>(({ theme, severity }) => {
  const color = (theme.palette as unknown as SeverityPalette)[severity].main
  return {
    borderLeft: `4px solid ${color}`,
    backgroundColor: hexToRGBA(color, 0.05),
    height: '100%',
  }
})

export const StyledAlertAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'severityColor',
})<{ severityColor: string }>(({ severityColor }) => ({
  width: 36,
  height: 36,
  backgroundColor: severityColor,
  flexShrink: 0,
}))

export const StyledAlertChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'severityColor',
})<{ severityColor: string }>(({ theme, severityColor }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: severityColor,
  borderColor: severityColor,
}))
