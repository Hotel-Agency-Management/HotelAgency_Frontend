import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ar'
import 'dayjs/locale/en'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(utc)
dayjs.extend(timezone)

// Override Arabic locale to use "يوم" (unit form) instead of plural "أيام"
dayjs.updateLocale('ar', {
  relativeTime: {
    future: 'في %s',
    past: 'منذ %s',
    s: 'ثوانٍ',
    m: 'دقيقة',
    mm: '%d دقيقة',
    h: 'ساعة',
    hh: '%d ساعة',
    d: 'يوم',
    dd: (n: number) => `${n} ${n <= 10 ? 'أيام' : 'يوم'}`,
    M: 'شهر',
    MM: (n: number) => `${n} ${n <= 10 ? 'أشهر' : 'شهر'}`,
    y: 'سنة',
    yy: (n: number) => `${n} ${n <= 10 ? 'سنوات' : 'سنة'}`,
  },
})

export function fromNow(date: string, locale: string = 'en'): string {
  return dayjs.utc(date).tz(dayjs.tz.guess()).locale(locale).fromNow()
}
