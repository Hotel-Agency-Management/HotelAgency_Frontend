import type {
  AgencyOwnerSignupRequest,
  CustomerSignupRequest
} from '@/components/auth/configs/authConfig'
import { SIGNUP_API_ACCOUNT_TYPE } from '@/components/auth/configs/authConfig'
import { getCountryFromPhone } from '@/components/auth/utils/getCountryFromPhone'
import type { AgencyFormData } from '@/components/auth/agency/types/agency'
import type { SignupFormData } from '../types/signup'

export const createCustomerSignupPayload = (
  accountData: SignupFormData
): CustomerSignupRequest => {
  const { confirmPassword, role, phone, ...rest } = accountData

  return {
    ...rest,
    phoneNumber: phone,
    accountType: SIGNUP_API_ACCOUNT_TYPE.CUSTOMER
  }
}

export const createAgencyOwnerSignupPayload = (
  accountData: SignupFormData,
  agencyData: AgencyFormData
): AgencyOwnerSignupRequest => {
  const { confirmPassword, role, phone, ...rest } = accountData
  const country = getCountryFromPhone(agencyData.phone) || getCountryFromPhone(phone)

  return {
    ...rest,
    phoneNumber: phone,
    accountType: SIGNUP_API_ACCOUNT_TYPE.AGENCY_OWNER,
    agencyName: agencyData.agencyName,
    city: agencyData.city,
    country,
    phone: agencyData.phone
  }
}
