import { Stack, Typography, useTheme } from "@mui/material"

export interface InfoRowProps {
  icon: React.ReactNode
  value: string
}

export function InfoRow({ icon, value }: InfoRowProps) {
  const theme = useTheme()
  return (
    <Stack direction='row' alignItems='center' spacing={1} sx={{ minWidth: 0 }}>
      <Stack
        sx={{
          color: theme.palette.text.disabled,
          flexShrink: 0,
        }}
      >
        {icon}
      </Stack>
      <Typography
        variant='body2'
        noWrap
        sx={{ fontWeight: 400 }}
      >
        {value}
      </Typography>
    </Stack>
  )
}
