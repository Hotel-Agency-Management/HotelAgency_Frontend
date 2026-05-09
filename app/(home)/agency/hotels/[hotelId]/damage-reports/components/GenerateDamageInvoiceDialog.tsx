'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { openDamageInvoicePdf } from '../invoice/components/openDamageInvoicePdf'
import { generateDamageInvoiceNumber } from '../invoice/utils/damageInvoice'
import type { DamageReport } from '../types/damageReport'
import type { DamageInvoice } from '../invoice/types/damageInvoice'
import { zodResolver } from '@hookform/resolvers/zod'
import { damageInvoiceSchema } from '../schema/damageInvoiceSchema'


interface FormValues {
  customerName: string
  customerEmail?: string
  damageAmount: number
}

interface GenerateDamageInvoiceDialogProps {
  open: boolean
  report: DamageReport | null
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  onClose: () => void
  onInvoiced: (reportId: string) => void
}

export default function GenerateDamageInvoiceDialog({
  open,
  report,
  hotelName,
  hotelLogo,
  hotelPrimaryColor,
  hotelSecondaryColor,
  onClose,
  onInvoiced,
}: GenerateDamageInvoiceDialogProps) {
  const { t } = useTranslation()

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(damageInvoiceSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      damageAmount: 0,
    },
  })

  useEffect(() => {
    if (open && report) {
      reset({
        customerName: report.reportedBy,
        customerEmail: '',
        damageAmount: report.estimatedCost,
      })
    }
  }, [open, report, reset])

  function handleClose() {
    reset()
    onClose()
  }

  async function onValid(values: FormValues) {
    if (!report) return

    const invoice: DamageInvoice = {
      invoiceNumber: generateDamageInvoiceNumber(),
      reportId: report.id,
      reservationId: report.reservationId,
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      hotelName,
      hotelLogo,
      hotelPrimaryColor,
      hotelSecondaryColor,
      roomNumber: report.roomNumber,
      damageDescription: report.description,
      damageAmount: values.damageAmount,
      currency: report.currency,
      invoiceDate: new Date().toISOString(),
      invoiceStatus: 'unpaid',
    }

    await openDamageInvoicePdf(invoice)
    onInvoiced(report.id)
    handleClose()
  }

  if (!report) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('damageReports.generateInvoice', 'Generate Damage Invoice')}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Stack gap={0.5}>
            <Typography variant="body2">
              {t('damageReports.room', 'Room')}: <strong>{report.roomNumber}</strong>
            </Typography>
            <Typography variant="body2">
              {report.description}
            </Typography>
          </Stack>

          <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('damageReports.customerName', 'Customer Name')}
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="customerEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('damageReports.customerEmail', 'Customer Email (optional)')}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="damageAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('damageReports.damageAmount', 'Damage Amount')}
                type="number"
                slotProps={{ htmlInput: { min: 0 } }}
                error={!!errors.damageAmount}
                helperText={errors.damageAmount?.message}
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
        <Button onClick={handleSubmit(onValid)} variant="contained" color="primary">
          {t('damageReports.generateAndOpen', 'Generate & Open PDF')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
