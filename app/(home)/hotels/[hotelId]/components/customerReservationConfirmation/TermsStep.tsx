import { Alert, Checkbox, FormControlLabel, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TermsStepProps {
  hasActiveTerms: boolean
  termsAccepted: boolean
  termsContent: string
  termsLoading: boolean
  termsTitle: string
  onTermsAcceptedChange: (value: boolean) => void
}

export function TermsStep({
  hasActiveTerms,
  termsAccepted,
  termsContent,
  termsLoading,
  termsTitle,
  onTermsAcceptedChange,
}: TermsStepProps) {
  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Typography variant="body2">
        {t('hotelPortal.booking.readTerms', 'Read the terms and conditions, then accept them to continue.')}
      </Typography>

      {!hasActiveTerms && !termsLoading ? (
        <Alert severity="info">
          {t('hotelPortal.booking.noActiveTerms', 'No active hotel terms were found. The standard reservation terms are shown instead.')}
        </Alert>
      ) : null}

      {termsLoading ? (
        <Alert severity="info">{t('hotelPortal.booking.loadingTerms', 'Loading hotel terms and conditions...')}</Alert>
      ) : null}

      <Paper variant="customerReservationTermsContent">
        <Stack spacing={1}>
          <Typography variant="subtitle2" fontWeight={700}>
            {termsTitle}
          </Typography>
          <Typography variant="body2" whiteSpace="pre-line">
            {termsContent}
          </Typography>
        </Stack>
      </Paper>

      <FormControlLabel
        control={
          <Checkbox
            checked={termsAccepted}
            onChange={event => onTermsAcceptedChange(event.target.checked)}
          />
        }
        label={t('hotelPortal.booking.agreeToTerms', 'I agree to the terms and conditions.')}
      />
    </Stack>
  )
}
