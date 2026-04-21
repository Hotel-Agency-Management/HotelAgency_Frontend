export function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/'

  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed.length === 0 ? '/' : trimmed
}

export function splitPathname(pathname: string) {
  return normalizePathname(pathname)
    .split('/')
    .filter(Boolean)
}
