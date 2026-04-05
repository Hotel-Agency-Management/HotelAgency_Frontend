import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ar'
import 'dayjs/locale/en'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export function fromNow(date: string, locale: string = 'en'): string {
  return dayjs.utc(date).tz(dayjs.tz.guess()).locale(locale).fromNow()
}
