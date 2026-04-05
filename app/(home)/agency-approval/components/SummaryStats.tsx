import { Grid, useTheme } from '@mui/material'
import {
  HourglassEmptyOutlined,
  CheckCircleOutline,
  CancelOutlined,
  BusinessOutlined,
} from '@mui/icons-material'
import { AgencyRequest } from '../types/agency'
import { StatCard } from './StatCard'
interface SummaryStatsProps {
  requests: AgencyRequest[]
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
  <Grid container spacing={2}>
    {stats.map((stat) => (
      <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard {...stat} />
      </Grid>
    ))}
  </Grid>
)
}
