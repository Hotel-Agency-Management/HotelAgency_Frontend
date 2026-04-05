import { Box, Typography, Button, CircularProgress, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'

export function LoadingState() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' py={8}>
      <CircularProgress size={32} />
    </Box>
  )
}

export function EmptyState() {
  return (
    <Box textAlign='center' py={8}>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        No plans yet
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Create your first subscription plan using the form above.
      </Typography>
    </Box>
  )
}

interface ErrorStateProps {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <Box textAlign='center' py={8}>
      <Typography variant='subtitle1' fontWeight={600} gutterBottom>
        Failed to load plans
      </Typography>
      <Stack spacing={2}>
      <Typography variant='body2' color='text.secondary'>
        Something went wrong. Please try again.
      </Typography>
      <Button startIcon={<Refresh />} onClick={onRetry} variant='outlined' size='small'>
        Retry
      </Button>
      </Stack>
    </Box>
  )
}
