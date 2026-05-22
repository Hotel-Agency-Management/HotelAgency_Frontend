'use client'

import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Icon from '@/components/icon/Icon'
import type { FinancialAlert } from '../types/accountantDashboardTypes'
import { StyledAlertCard, StyledAlertAvatar, StyledAlertChip } from '../styles/StyledComponents'

interface FinancialAlertCardProps {
  alert: FinancialAlert
}

export default function FinancialAlertCard({ alert }: FinancialAlertCardProps) {
  const theme = useTheme()
  const color = theme.palette[alert.severity].main

  return (
    <StyledAlertCard severity={alert.severity} variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <StyledAlertAvatar severityColor={color}>
              <Icon icon={alert.icon} fontSize={18} color="white" />
            </StyledAlertAvatar>
            <Typography variant="subtitle2" fontWeight={600} flex={1}>
              {alert.title}
            </Typography>
          </Stack>

          <Typography variant="body2">
            {alert.description}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            {alert.amount !== undefined && (
              <StyledAlertChip
                label={`$${alert.amount.toLocaleString()}`}
                size="small"
                severityColor={color}
                variant="outlined"
              />
            )}
            <Typography variant="caption" color="text.disabled">
              {alert.timestamp}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </StyledAlertCard>
  )
}
