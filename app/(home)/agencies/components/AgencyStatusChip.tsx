
import { Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { statusConfig } from '../constants/statusConfig';
import { AgencyStatus } from '@/components/auth/types/authType';

interface Props {
  status: AgencyStatus
}
export default function AgencyStatusChip({ status }: Props) {
  const { t } = useTranslation()
  const { color } = statusConfig[status]
  const label = t(`agencies.status.${status.toLowerCase()}`, statusConfig[status].label)
  return <Chip label={label} color={color} size='small' variant='filled' />
}
