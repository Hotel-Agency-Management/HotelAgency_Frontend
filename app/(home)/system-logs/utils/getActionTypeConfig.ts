import type { PaletteColor, Theme } from '@mui/material/styles'

export interface ActionTypeConfig {
  icon: string
  color: keyof Pick<Theme['palette'], 'success' | 'error' | 'info' | 'warning'> | 'grey'
}

const POSITIVE_SUFFIXES = ['CREATED', 'APPROVED', 'RESOLVED', 'RECORDED', 'INVITED']
const NEGATIVE_SUFFIXES = ['CANCELLED', 'REJECTED', 'DELETED']
const NEUTRAL_SUFFIXES = ['UPDATED', 'EXTENDED']

export function getActionTypeConfig(action: string): ActionTypeConfig {
  if (POSITIVE_SUFFIXES.some(suffix => action.endsWith(suffix))) {
    return { icon: 'lucide:plus-circle', color: 'success' }
  }
  if (NEGATIVE_SUFFIXES.some(suffix => action.endsWith(suffix))) {
    return { icon: 'lucide:x-circle', color: 'error' }
  }
  if (NEUTRAL_SUFFIXES.some(suffix => action.endsWith(suffix))) {
    return { icon: 'lucide:pencil', color: 'info' }
  }
  return { icon: 'lucide:activity', color: 'grey' }
}

export function resolveActionTypePalette(theme: Theme, color: ActionTypeConfig['color']): PaletteColor {
  if (color === 'grey') {
    return {
      main: theme.palette.text.disabled,
      light: theme.palette.text.disabled,
      dark: theme.palette.text.disabled,
      contrastText: theme.palette.background.paper
    }
  }
  return theme.palette[color]
}
