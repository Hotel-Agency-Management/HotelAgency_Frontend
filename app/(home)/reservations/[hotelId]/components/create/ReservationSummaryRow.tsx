import { Box, Stack, Typography } from '@mui/material'
import type { LucideIcon } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'

interface ReservationSummaryRowProps {
  icon: LucideIcon
  label: string
  value: string
}

export function ReservationSummaryRow({
  icon: Icon,
  label,
  value,
}: ReservationSummaryRowProps) {
  return (
    <Stack direction='row' spacing={1.5} alignItems='center'>
      <Avatar variant='soft' color='primary' sx={{ width: 36, height: 36, borderRadius: 2 }}>
        <Icon size={16} />
      </Avatar>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant='caption' color='text.disabled'>
          {label}
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  )
}
