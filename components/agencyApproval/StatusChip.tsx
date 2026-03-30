import { StatusChipProps, STATUS_CONFIG } from '@/core/constant/statusChip'
import { Chip, useTheme } from '@mui/material'


export default function StatusChip({ status }: StatusChipProps) {
  const theme = useTheme()
  const config = STATUS_CONFIG[status]

  const palette = theme.palette[config.colorKey]

  return (
    <Chip
      label={config.label}
      size='small'
      sx={{
        fontWeight: 600,
        fontSize: theme.typography.caption.fontSize,
        letterSpacing: '0.04em',
        bgcolor: `${palette.main}18`,
        color: palette.dark ?? palette.main,
        border: `1px solid ${palette.main}35`,
        borderRadius: theme.shape.borderRadius,
        height: 26,
        '& .MuiChip-label': { px: 1.25 },
      }}
    />
  )
}
