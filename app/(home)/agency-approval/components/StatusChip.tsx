import { Chip, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { STATUS_CONFIG, StatusChipProps } from '../constants/statusChip'


export default function StatusChip({ status }: StatusChipProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const config = STATUS_CONFIG[status]

  const palette = theme.palette[config.colorKey]

  const label = t(`agencyApproval.statusChip.${status.toLowerCase()}`, config.label)

  return (
    <Chip
      label={label}
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
