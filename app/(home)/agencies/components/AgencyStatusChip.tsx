
import { Chip } from '@mui/material'
import { AgencyStatus } from '../types/agency';
import { statusConfig } from '../constants/statusConfig';

interface Props {
  status: AgencyStatus
}
export default function AgencyStatusChip({ status }: Props) {
  const { label, color } = statusConfig[status]
  return <Chip label={label} color={color} size='small' variant='filled' />
}
