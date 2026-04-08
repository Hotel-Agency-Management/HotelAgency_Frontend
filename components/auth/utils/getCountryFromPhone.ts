import { AsYouType } from 'mui-tel-input'

const regionNames =
  typeof Intl !== 'undefined'
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null

export const getCountryFromPhone = (phone: string): string => {
  const parser = new AsYouType()
  parser.input(phone)

  const countryCode = parser.getCountry() ?? parser.getNumber()?.country

  if (!countryCode) {
    return ''
  }

  return regionNames?.of(countryCode) ?? countryCode
}
