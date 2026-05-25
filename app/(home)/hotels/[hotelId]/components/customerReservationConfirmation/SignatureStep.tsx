import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SignaturePadField } from '@/components/common/SignaturePadField'

interface SignatureStepProps {
  signatureDataUrl: string
  stepError?: string
  onSignatureChange: (value: string) => void
}

export function SignatureStep({ signatureDataUrl, stepError, onSignatureChange }: SignatureStepProps) {
  const { t } = useTranslation()

  return (
    <Stack className='customer-reservation-signature-pad' spacing={2}>
      <Typography variant='body2'>
        {t('hotelPortal.booking.addSignatureBelow', {
          defaultValue: 'Add your signature in the box below to attach it to this reservation.'
        })}
      </Typography>

      <SignaturePadField
        value={signatureDataUrl}
        onChange={onSignatureChange}
        title={t('hotelPortal.booking.customerSignature', { defaultValue: 'Customer signature' })}
        description={t('hotelPortal.booking.drawSignatureApprove', {
          defaultValue: 'Draw your signature to approve this reservation.'
        })}
        clearLabel={t('hotelPortal.booking.clearSignature', { defaultValue: 'Clear signature' })}
        error={stepError}
      />
    </Stack>
  )
}
