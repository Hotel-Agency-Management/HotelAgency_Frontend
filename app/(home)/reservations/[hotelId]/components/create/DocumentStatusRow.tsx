import { Chip, Stack, Typography } from '@mui/material'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface DocumentStatusRowProps {
  label: string
  ready: boolean
}

export function DocumentStatusRow({ label, ready }: DocumentStatusRowProps) {
  return (
    <Stack direction='row' spacing={1.5} alignItems='center'>
      <Stack sx={{ color: ready ? 'success.main' : 'text.disabled' }}>
        {ready ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </Stack>
      <Typography variant='body2' color={ready ? 'success.main' : 'text.secondary'}>
        {label}
      </Typography>
      <Chip
        label={ready ? 'Ready' : 'Not generated'}
        size='small'
        color={ready ? 'success' : 'default'}
        variant='outlined'
      />
    </Stack>
  )
}