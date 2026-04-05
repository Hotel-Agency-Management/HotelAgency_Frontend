import { Stack, Button, Tooltip, Divider } from '@mui/material'
import { XCircle, CheckCircle } from 'lucide-react'
import type { AgencyRequest, ActionType } from '../types/agency'

interface AgencyCardActionsProps {
  request: AgencyRequest
  onAction: (request: AgencyRequest, action: ActionType) => void
}

export default function AgencyCardActions({
  request,
  onAction,
}: AgencyCardActionsProps) {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Divider orientation='vertical' flexItem sx={{ height: 20 }} />

      <Tooltip title='Reject this agency'>
        <Button
          size='small'
          variant='outlined'
          startIcon={<XCircle size={14} />}
          onClick={() => onAction(request, 'reject')}
          color='error'
        >
          Reject
        </Button>
      </Tooltip>

      <Tooltip title='Approve this agency'>
        <Button
          size='small'
          variant='contained'
          startIcon={<CheckCircle size={14} />}
          onClick={() => onAction(request, 'approve')}
          color='success'
        >
          Approve
        </Button>
      </Tooltip>
    </Stack>
  )
}
