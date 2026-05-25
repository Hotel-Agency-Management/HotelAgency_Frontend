'use client'

import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { Alert, Button, Checkbox, FormControlLabel, Paper, Stack, Typography } from '@mui/material'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Spinner from '@/components/loaders/Spinner'
import type { ReservationContractData } from '../../types/customerReservationContract'
import { ReservationContractDocument } from '../customerReservationContract/ReservationContractDocument'

interface ContractPreviewStepProps {
  contract: ReservationContractData
  previewAccepted: boolean
  stepError?: string
  onPreviewAcceptedChange: (value: boolean) => void
}

export function ContractPreviewStep({
  contract,
  previewAccepted,
  stepError,
  onPreviewAcceptedChange
}: ContractPreviewStepProps) {
  const { t } = useTranslation()
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null)
  const [pdfError, setPdfError] = useState(false)

  useEffect(() => {
    let objectUrl: string | null = null

    pdf(<ReservationContractDocument contract={contract} />)
      .toBlob()
      .then(blob => {
        objectUrl = URL.createObjectURL(blob)

        setPdfBlobUrl(objectUrl)
        setPdfError(false)
      })
      .catch(error => {
        console.error('Failed to generate reservation contract PDF', error)

        setPdfBlobUrl(null)
        setPdfError(true)
      })

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [contract])

  return (
    <Stack spacing={2.5} alignItems='center'>
      {stepError ? <Alert severity='warning'>{stepError}</Alert> : null}

      <Paper variant='customerReservationContractPreview'>
        <Stack spacing={1.75} alignItems='center' textAlign='center'>
          <FileText size={36} />

          <Stack spacing={0.75} alignItems='center'>
            <Typography variant='h6' fontWeight={800}>
              {t('hotelPortal.booking.reservationContract', { defaultValue: 'Reservation contract' })}
            </Typography>

            <Typography variant='body2'>
              {t('hotelPortal.booking.openContractToReview', {
                defaultValue: 'Open the contract in a new tab to review it before continuing.'
              })}
            </Typography>
          </Stack>

          {pdfError ? (
            <Alert severity='error' sx={{ width: '100%' }}>
              {t('hotelPortal.booking.contractPreviewFailed', {
                defaultValue: 'Failed to generate contract preview. Please try again.'
              })}
            </Alert>
          ) : pdfBlobUrl ? (
            <Button
              component='a'
              href={pdfBlobUrl}
              target='_blank'
              rel='noopener noreferrer'
              variant='outlined'
              startIcon={<FileText size={16} />}
            >
              {t('hotelPortal.booking.openContractPreview', { defaultValue: 'Open contract preview' })}
            </Button>
          ) : (
            <Spinner />
          )}
        </Stack>
      </Paper>

      <Paper variant='customerReservationConfirmationPanel'>
        <FormControlLabel
          control={
            <Checkbox checked={previewAccepted} onChange={event => onPreviewAcceptedChange(event.target.checked)} />
          }
          label={t('hotelPortal.booking.reviewedContractContinue', {
            defaultValue: 'I reviewed the contract and want to continue to signature.'
          })}
        />
      </Paper>
    </Stack>
  )
}
