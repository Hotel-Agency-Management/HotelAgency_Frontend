import type { SxProps, Theme } from '@mui/material'

export const roomProfileStyles = {
  container: (isDeleting: boolean): SxProps<Theme> => ({
    width: 1,
    maxWidth: 1120,
    mx: 'auto',
    opacity: isDeleting ? 0.6 : 1,
    pointerEvents: isDeleting ? 'none' : 'auto',
  }),
}
