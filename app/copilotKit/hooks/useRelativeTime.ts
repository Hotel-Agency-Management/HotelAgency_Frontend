import { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { RELATIVE_TIME_TICK_MS } from '../constant/chat'

export function useRelativeTime(date: Date): string {
  const [, forceTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => forceTick(tick => tick + 1), RELATIVE_TIME_TICK_MS)
    return () => clearInterval(interval)
  }, [])

  return formatDistanceToNowStrict(date, { addSuffix: true })
}
