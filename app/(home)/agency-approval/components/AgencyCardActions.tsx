import { Stack, Button, Tooltip, Divider } from '@mui/material'
import { XCircle, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { AgencyRequest, ActionType } from '../types/agency'

interface AgencyCardActionsProps {
  request: AgencyRequest
  onAction: (request: AgencyRequest, action: ActionType) => void
}

export default function AgencyCardActions({ request, onAction }: AgencyCardActionsProps) {
  const { t } = useTranslation()

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Divider orientation='vertical' flexItem sx={{ height: 20 }} />

      <Tooltip title={t('agencyApproval.actions.rejectTooltip', { defaultValue: 'Reject this agency' })}>
        <Button
          size='small'
          variant='outlined'
          startIcon={<XCircle size={14} />}
          onClick={() => onAction(request, 'reject')}
          color='error'
        >
          {t('agencyApproval.actions.reject', { defaultValue: 'Reject' })}
        </Button>
      </Tooltip>

      <Tooltip title={t('agencyApproval.actions.approveTooltip', { defaultValue: 'Approve this agency' })}>
        <Button
          size='small'
          variant='contained'
          startIcon={<CheckCircle size={14} />}
          onClick={() => onAction(request, 'approve')}
          color='success'
        >
          {t('agencyApproval.actions.approve', { defaultValue: 'Approve' })}
        </Button>
      </Tooltip>
    </Stack>
  )
}
