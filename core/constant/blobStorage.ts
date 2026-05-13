export const BLOB_URL = process.env.NEXT_PUBLIC_BLOB_URL?.replace(/\/$/, '')
export const BLOB_PROFILES_CONTAINER = process.env.NEXT_PUBLIC_BLOB_CONTAINER_PROFILES

const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:)/i

export function resolveBlobUrl(path?: string | null, container = BLOB_PROFILES_CONTAINER): string | null {
  const value = path?.trim()

  if (!value) return null
  if (ABSOLUTE_URL_PATTERN.test(value)) return value
  if (!BLOB_URL || !container) return value

  return `${BLOB_URL}/${container}/${value.replace(/^\/+/, '')}`
}

export function resolveProfileBlobUrl(path?: string | null): string | null {
  return resolveBlobUrl(path)
}
