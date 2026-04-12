
import { Chip } from '@mui/material'
import { statusConfig } from '../constants/statusConfig';
import { AgencyStatus } from '@/components/auth/types/authType';

interface Props {
  status: AgencyStatus
}
export default function AgencyStatusChip({ status }: Props) {
  const { label, color } = statusConfig[status]
  return <Chip label={label} color={color} size='small' variant='filled' />
}
