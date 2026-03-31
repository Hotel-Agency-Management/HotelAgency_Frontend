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
          sx={{ textTransform: 'uppercase' }}
        >
          {label}
        </Typography>

        <Typography
          variant='body2'
          sx={{ fontWeight: 500 }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  )
}
