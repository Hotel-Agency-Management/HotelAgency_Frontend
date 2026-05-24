import { Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { br } from '@/core/utils/themeUtils'

interface PendingRequestsBadgeProps {
  count: number
}

export default function PendingRequestsBadge({ count }: PendingRequestsBadgeProps) {
  const { t } = useTranslation()
  const theme = useTheme()

  if (!count) return null

  return (
    <Stack
      sx={{
        px: 2,
        py: 0.875,
        borderRadius: br(theme, 1.5),
        bgcolor: alpha(theme.palette.warning.main, 0.1),
        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        variant='caption'
        sx={{
          fontWeight: 700,
          color: theme.palette.warning.dark,
        }}
      >
        {t('agencyApproval.pendingBadge', { count })}
      </Typography>
    </Stack>
  )
}
