'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Alert,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { DamageReport } from '../types/damageReport'

interface ResolveDamageDialogProps {
  open: boolean
  report: DamageReport | null
  onClose: () => void
  onMarkInsured: (reportId: string) => void
  onGenerateInvoice: (report: DamageReport) => void
}

export default function ResolveDamageDialog({
  open,
  report,
  onClose,
  onMarkInsured,
  onGenerateInvoice,
}: ResolveDamageDialogProps) {
  const { t } = useTranslation()

  if (!report) return null

  const hasInsurance = report.hasInsurance === true

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('damageReports.resolveTitle', 'Resolve Damage Report')}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Stack gap={0.5}>
            <Typography variant="body2">
              {t('damageReports.room', 'Room')}: <strong>{report.roomNumber}</strong>
            </Typography>
            <Typography variant="body2">{report.description}</Typography>
          </Stack>

          {hasInsurance ? (
            <Alert severity="success">
              {t(
                'damageReports.insuredNotice',
                'This guest has insurance. The damage can be covered at no charge to the guest.'
              )}
            </Alert>
          ) : (
            <Alert severity="warning">
              {t(
                'damageReports.noInsuranceNotice',
                'This guest has no insurance. A damage invoice must be generated.'
              )}
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('common.cancel', 'Cancel')}
        </Button>
        {hasInsurance ? (
          <Button
            onClick={() => { onMarkInsured(report.id); onClose() }}
            variant="contained"
            color="success"
          >
            {t('damageReports.markInsured', 'Mark as Covered')}
          </Button>
        ) : (
          <Button
            onClick={() => { onGenerateInvoice(report); onClose() }}
            variant="contained"
            color="primary"
          >
            {t('damageReports.generateInvoice', 'Generate Invoice')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
