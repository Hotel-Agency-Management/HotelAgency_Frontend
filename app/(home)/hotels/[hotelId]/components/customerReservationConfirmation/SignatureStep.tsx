import { Stack, Typography } from '@mui/material'
import { SignaturePadField } from '@/components/common/SignaturePadField'

interface SignatureStepProps {
  signatureDataUrl: string
  stepError?: string
  onSignatureChange: (value: string) => void
}

export function SignatureStep({
  signatureDataUrl,
  stepError,
  onSignatureChange,
}: SignatureStepProps) {
  return (
    <Stack className="customer-reservation-signature-pad" spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Add your signature in the box below to attach it to this reservation.
      </Typography>

      <SignaturePadField
        value={signatureDataUrl}
        onChange={onSignatureChange}
        title="Customer signature"
        description="Draw your signature to approve this reservation."
        clearLabel="Clear signature"
        error={stepError}
      />
    </Stack>
  )
}
