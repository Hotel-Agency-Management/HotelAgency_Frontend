export const extractEmailFromMessage = (message?: string): string | null => {
  if (!message) return null

  const match = message.match(/'([^']+)'/)
  return match ? match[1] : null
}
