import { Paper } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const GradientCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
    theme.palette.background.paper,
    0.98
  )} 55%)`,
}))

