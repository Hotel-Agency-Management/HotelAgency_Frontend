import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ar'
import 'dayjs/locale/en'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

// Arabic uses plural (ساعات) only for 3–10; 1 and 11+ take singular (ساعة)
const arRt = (dayjs as any).Ls?.ar?.relativeTime
if (arRt) {
  arRt.hh = (n: number) => (n >= 3 && n <= 10 ? `${n} ساعات` : `${n} ساعة`)
  arRt.mm = (n: number) => (n >= 3 && n <= 10 ? `${n} دقائق` : `${n} دقيقة`)
  arRt.dd = (n: number) => (n >= 3 && n <= 10 ? `${n} أيام` : `${n} يوم`)
  arRt.MM = (n: number) => (n >= 3 && n <= 10 ? `${n} أشهر` : `${n} شهر`)
  arRt.yy = (n: number) => (n >= 3 && n <= 10 ? `${n} أعوام` : `${n} عام`)
}

export function fromNow(date: string, locale: string = 'en'): string {
  return dayjs.utc(date).tz(dayjs.tz.guess()).locale(locale).fromNow()
}
