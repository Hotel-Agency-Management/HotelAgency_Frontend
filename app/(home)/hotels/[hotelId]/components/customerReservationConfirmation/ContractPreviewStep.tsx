'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { ExternalLink, FileText } from 'lucide-react'
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
  onPreviewAcceptedChange,
}: ContractPreviewStepProps) {
  const [isOpeningPreview, setIsOpeningPreview] = useState(false)
  const [previewError, setPreviewError] = useState('')

  const handleOpenPreview = async () => {
    const targetWindow = window.open('about:blank', '_blank')

    if (targetWindow) {
      targetWindow.opener = null
    }

    try {
      setIsOpeningPreview(true)
      setPreviewError('')

      const blob = await pdf(<ReservationContractDocument contract={contract} />).toBlob()
      const blobUrl = URL.createObjectURL(blob)

      if (targetWindow) {
        targetWindow.location.href = blobUrl
        targetWindow.focus()
        return
      }

      window.open(blobUrl, '_blank', 'noopener,noreferrer')
    } catch {
      targetWindow?.close()
      setPreviewError('Unable to open the contract preview. Please try again.')
    } finally {
      setIsOpeningPreview(false)
    }
  }

  return (
    <Stack spacing={2.5} alignItems="center">
      {previewError ? <Alert severity="error">{previewError}</Alert> : null}
      {stepError ? <Alert severity="warning">{stepError}</Alert> : null}

      <Paper variant="customerReservationContractPreview">
        <Stack spacing={1.75} alignItems="center" textAlign="center">
          <FileText size={36} />
          <Stack spacing={0.75} alignItems="center">
            <Typography variant="h6" fontWeight={800}>
              Reservation contract
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExternalLink size={16} />}
            onClick={handleOpenPreview}
            disabled={isOpeningPreview}
            sx={{ minWidth: 220 }}
          >
            {isOpeningPreview ? 'Opening...' : 'Preview contract'}
          </Button>
        </Stack>
      </Paper>

      <Paper variant="customerReservationConfirmationPanel" sx={{ width: 1, maxWidth: 560 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={previewAccepted}
              onChange={event => onPreviewAcceptedChange(event.target.checked)}
            />
          }
          label="I reviewed the contract and want to continue to signature."
        />
      </Paper>
    </Stack>
  )
}
