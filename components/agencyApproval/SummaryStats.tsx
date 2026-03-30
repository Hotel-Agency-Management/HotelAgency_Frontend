import { Box, Stack, Typography, useTheme, alpha } from '@mui/material'
import {
  HourglassEmptyOutlined,
  CheckCircleOutline,
  CancelOutlined,
  BusinessOutlined,
} from '@mui/icons-material'
import { AgencyRequest } from './types'
import { br } from '@/core/utils/themeUtils'


interface StatCardProps {
  label: string
  count: number
  icon: React.ReactNode
  color: string
}

interface SummaryStatsProps {
  requests: AgencyRequest[]
}


function StatIconBox({ icon, color }: { icon: React.ReactNode; color: string }) {
  const theme = useTheme()
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 36,
        height: 36,
        borderRadius: br(theme, 1.5),
        bgcolor: alpha(color, 0.1),
        flexShrink: 0,
        '& svg': { fontSize: 18, color },
      }}
    >
      {icon}
    </Stack>
  )
}

function StatCard({ label, count, icon, color }: StatCardProps) {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.5}
      sx={{
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1.5, sm: 2 },
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: br(theme, 2),
        bgcolor: 'background.paper',
        flex: 1,
        minWidth: 0,
        transition: theme.transitions.create('box-shadow'),
        '&:hover': { boxShadow: theme.shadows[2] },
      }}
    >
      <StatIconBox icon={icon} color={color} />
      <Stack sx={{ minWidth: 0 }}>
        <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.1, letterSpacing: '-0.02em', color }}>
          {count}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.7rem' }}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  )
}


export default function SummaryStats({ requests }: SummaryStatsProps) {
  const theme = useTheme()

  const stats = [
    { label: 'Total Requests', count: requests.length,                                       icon: <BusinessOutlined />,       color: theme.palette.primary.main },
    { label: 'Pending Review', count: requests.filter(r => r.status === 'pending').length,   icon: <HourglassEmptyOutlined />, color: theme.palette.warning.main },
    { label: 'Approved',       count: requests.filter(r => r.status === 'approved').length,  icon: <CheckCircleOutline />,     color: theme.palette.success.main },
    { label: 'Rejected',       count: requests.filter(r => r.status === 'rejected').length,  icon: <CancelOutlined />,         color: theme.palette.error.main   },
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        gap: 2,
      }}
    >
      {stats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </Box>
  )
}
