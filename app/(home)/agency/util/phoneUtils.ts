import { MuiTelInputInfo } from 'mui-tel-input'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

export function getCountryName(info: MuiTelInputInfo): string | null {
  const countryCode = info.countryCode

  if (!countryCode) return null

  return regionNames.of(countryCode) ?? countryCode
}
