import { Stack, Typography } from '@mui/material'

interface ProfileFieldDisplayProps {
  label: string
  value: string
  icon: React.ReactNode
  editable: boolean
  iconColor?: string
}

export function ProfileFieldDisplay({
  label,
  value,
  icon,
  editable,
  iconColor,
}: ProfileFieldDisplayProps) {
  return (
    <Stack direction='row' spacing={1.25} alignItems='flex-start'>
      <Stack
        sx={{
          color: iconColor ?? 'inherit',
          flexShrink: 0,
        }}
      >
        {icon}
      </Stack>

      <Stack spacing={0.35}>
        <Stack direction='row' spacing={0.5} alignItems='center'>
          <Typography variant='caption' color='text.disabled'>
            {label}
          </Typography>

          {!editable && (
            <Typography
              component='span'
              variant='caption'
              color='text.disabled'
              sx={{ opacity: 0.65 }}
            >
              (read-only)
            </Typography>
          )}
        </Stack>

        <Typography variant='body1' color='text.primary' fontWeight={500}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  )
}
