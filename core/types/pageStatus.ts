export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info'
}

export const PAGE_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
} as const

export type PageStatus = (typeof PAGE_STATUS)[keyof typeof PAGE_STATUS]
