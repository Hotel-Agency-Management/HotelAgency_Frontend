import { Box, Stack, Typography } from "@mui/material";

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

export function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <Stack direction='row' spacing={2} alignItems='flex-start'>
      <Box>
        {icon}
      </Box>
      <Stack spacing={0.25}>
        <Typography
          variant='caption'
          color='text.disabled'
          sx={{ fontSize: '0.68rem', textTransform: 'uppercase' }}
        >
          {label}
        </Typography>

        <Typography
          variant='body2'
          sx={{ fontWeight: 500, fontSize: '0.85rem' }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  )
}
