import type {
  AgencyOwnerSignupRequest,
  CustomerSignupRequest
} from '@/components/auth/configs/authConfig'
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
    accountType: 'Customer'
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
    accountType: 'AgencyOwner',
    agencyName: agencyData.agencyName,
    city: agencyData.city,
    country,
    phone: agencyData.phone
  }
}
