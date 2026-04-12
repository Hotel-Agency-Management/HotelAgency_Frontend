export interface ApiValidationError {
  message?: string
  detail?: string
  title?: string
  errors?: Record<string, string | string[]>
}
