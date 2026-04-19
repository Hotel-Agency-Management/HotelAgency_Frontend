import { UpdateUserProfileRequest } from "../configs/userProfileConfig"
import { ProfileFields } from "../types/profile"
import { splitFullName } from "./formatters"

export const getProfileFields = (data: ProfileFields): ProfileFields => ({
  name: data.name ?? '',
  email: data.email ?? '',
  phone: data.phone ?? '',
  birthDate: data.birthDate ?? '',
  gender: data.gender ?? '',
})

export const buildUpdatePayload = (
  fields: ProfileFields
): UpdateUserProfileRequest => {
  const { firstName, lastName } = splitFullName(fields.name)

  return {
    firstName,
    lastName,
    phoneNumber: fields.phone,
    dateOfBirth: fields.birthDate,
    gender: fields.gender,
  }
}
