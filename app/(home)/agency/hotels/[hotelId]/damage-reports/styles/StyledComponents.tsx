import { styled, Box, Card, alpha, Chip } from '@mui/material'

interface ChipStyleProps {
  chipColor: string
}

export const DamageReportsHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const DamageReportsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
  gap: theme.spacing(2),
}))

interface DamageReportCardProps {
  isEscalated?: boolean
}

export const DamageReportCard = styled(Card)<DamageReportCardProps>(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
}))

export const DamageCardActions = styled(Box)({
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
})

export const StyledChip = styled(Chip)<ChipStyleProps>(({ chipColor }) => ({
  backgroundColor: alpha(chipColor, 0.14),
  color: chipColor,
  fontWeight: 600,
}))
