'use client'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DAMAGE_SEVERITY_OPTIONS } from '../constants/damageReport'
import type { ReportDamageInput } from '../hooks/useDamageReports'
import type { DamageSeverity } from '../types/damageReport'

const schema = yup.object({
  description: yup.string().required('Description is required'),
  severity: yup.string().oneOf(['LOW', 'MEDIUM', 'HIGH'] as const).required('Severity is required'),
  estimatedCost: yup
    .number()
    .typeError('Must be a number')
    .min(0, 'Must be 0 or more')
    .required('Estimated cost is required'),
})

interface FormValues {
  description: string
  severity: DamageSeverity
  estimatedCost: number
}

interface ReportDamageDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (input: ReportDamageInput) => void
  prefill: {
    hotelId: string
    roomNumber: string
    taskId: string
    reservationId?: string
    reportedBy: string
    currency: string
    hasInsurance?: boolean
  }
}

export default function ReportDamageDialog({
  open,
  onClose,
  onSubmit,
  prefill,
}: ReportDamageDialogProps) {
  const { t } = useTranslation()

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { description: '', severity: 'MEDIUM', estimatedCost: 0 },
  })

  function handleClose() {
    reset()
    onClose()
  }

  function onValid(values: FormValues) {
    onSubmit({ ...prefill, ...values })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('damageReports.reportDamage', 'Report Room Damage')}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Typography variant="body2">
            {t('damageReports.room', 'Room')}:{' '}
            <strong>{prefill.roomNumber}</strong>
          </Typography>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('damageReports.description', 'Damage Description')}
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="severity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={t('damageReports.severity', 'Severity')}
                error={!!errors.severity}
                helperText={errors.severity?.message}
                fullWidth
              >
                {DAMAGE_SEVERITY_OPTIONS.map(opt => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="estimatedCost"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('damageReports.estimatedCost', 'Estimated Cost')}
                type="number"
                slotProps={{ htmlInput: { min: 0 } }}
                error={!!errors.estimatedCost}
                helperText={errors.estimatedCost?.message}
                fullWidth
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel', 'Cancel')}
        </Button>
        <Button onClick={handleSubmit(onValid)} variant="contained" color="error">
          {t('damageReports.submitReport', 'Submit Report')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
