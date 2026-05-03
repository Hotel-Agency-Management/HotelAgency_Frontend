'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { DamageReport } from '../types/damageReport'

interface EscalateDamageDialogProps {
  open: boolean
  report: DamageReport | null
  onClose: () => void
  onConfirm: (reportId: string) => void
}

export default function EscalateDamageDialog({
  open,
  report,
  onClose,
  onConfirm,
}: EscalateDamageDialogProps) {
  const { t } = useTranslation()

  if (!report) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('damageReports.escalateTitle', 'Escalate to Front Desk')}</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body2">
            {t(
              'damageReports.escalateConfirm',
              'Escalate the damage report for room {{room}} to Front Desk for resolution?',
              { room: report.roomNumber }
            )}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {report.description}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('common.cancel', 'Cancel')}
        </Button>
        <Button
          onClick={() => { onConfirm(report.id); onClose() }}
          variant="contained"
          color="warning"
        >
          {t('damageReports.escalate', 'Escalate')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
