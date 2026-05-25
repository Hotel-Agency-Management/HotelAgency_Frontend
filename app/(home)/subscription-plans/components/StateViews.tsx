import { Box, Typography, Button, CircularProgress, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export function LoadingState() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' py={8}>
      <CircularProgress size={32} />
    </Box>
  )
}

export function EmptyState() {
  const { t } = useTranslation()

  return (
    <Box textAlign='center' py={8}>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        {t('subscriptionPlans.empty', { defaultValue: 'No plans yet' })}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {t('subscriptionPlans.emptyHint', { defaultValue: 'Create your first subscription plan using the form above.' })}
      </Typography>
    </Box>
  )
}

interface ErrorStateProps {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation()

  return (
    <Box textAlign='center' py={8}>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        {t('subscriptionPlans.loadError', { defaultValue: 'Failed to load plans' })}
      </Typography>
      <Stack spacing={2}>
      <Typography variant='body2' color='text.secondary'>
        {t('subscriptionPlans.loadErrorHint', { defaultValue: 'Something went wrong. Please try again.' })}
      </Typography>
      <Button startIcon={<Refresh />} onClick={onRetry} variant='outlined' size='small'>
        {t('subscriptionPlans.retry', { defaultValue: 'Retry' })}
      </Button>
      </Stack>
    </Box>
  )
}
