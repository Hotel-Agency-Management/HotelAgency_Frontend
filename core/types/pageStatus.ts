export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info'
}

export type PageStatus = 'idle' | 'loading' | 'error'
