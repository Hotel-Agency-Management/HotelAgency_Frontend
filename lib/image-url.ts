const BLOB_URL = process.env.NEXT_PUBLIC_BLOB_URL?.replace(/\/$/, '')
const CONTAINER = process.env.NEXT_PUBLIC_BLOB_CONTAINER_PROFILES
const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:)/i

function buildUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (ABSOLUTE_URL_PATTERN.test(path)) return path
  if (!BLOB_URL || !CONTAINER) return path
  return `${BLOB_URL}/${CONTAINER}/${path.replace(/^\/+/, '')}`
}

export function resolveProfileImage(path: string | null | undefined): string {
  return buildUrl(path)
}

export function resolveRoomImage(path: string | null | undefined): string {
  return buildUrl(path)
}
