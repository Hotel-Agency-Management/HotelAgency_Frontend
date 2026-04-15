import type { MuiTelInputCountry } from 'mui-tel-input'

const regionNames =
  typeof Intl !== 'undefined' && 'DisplayNames' in Intl
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null

export const getCountryNameFromPhoneCountry = (
  countryCode: MuiTelInputCountry | null
) => {
  if (!countryCode) return ''

  return regionNames?.of(countryCode) ?? countryCode
}
