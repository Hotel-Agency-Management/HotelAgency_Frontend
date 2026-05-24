import { Grid, useTheme } from '@mui/material'
import {
  HourglassEmptyOutlined,
  CheckCircleOutline,
  CancelOutlined,
  BusinessOutlined,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { AgencyRequest } from '../types/agency'
import { StatCard } from './StatCard'
import { AGENCY_STATUS } from '@/components/auth/types/authType'
interface SummaryStatsProps {
  requests: AgencyRequest[]
}

export default function SummaryStats({ requests }: SummaryStatsProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  const stats = [
    { label: t('agencyApproval.stats.totalRequests', 'Total Requests'), count: requests.length,                                       icon: <BusinessOutlined />,       color: theme.palette.primary.main },
    { label: t('agencyApproval.stats.pendingReview', 'Pending Review'), count: requests.filter(r => r.status === AGENCY_STATUS.PENDING).length,   icon: <HourglassEmptyOutlined />, color: theme.palette.warning.main },
    { label: t('agencyApproval.stats.approved', 'Approved'),       count: requests.filter(r => r.status === AGENCY_STATUS.APPROVED).length,  icon: <CheckCircleOutline />,     color: theme.palette.success.main },
    { label: t('agencyApproval.stats.rejected', 'Rejected'),       count: requests.filter(r => r.status === AGENCY_STATUS.REJECTED).length,  icon: <CancelOutlined />,         color: theme.palette.error.main   },
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
