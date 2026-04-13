import type { User } from '@/core/configs/authConfig'
import { USER_ROLE_LABELS, isUserRole } from '@/lib/abilities'
import { profileDummyData } from '@/lib/profileDummyData'
import type { ProfilePageData, ProfileUser } from '../types/profile'
import type { UserProfile } from '../configs/userProfileConfig'
import { joinName } from './formatters'

export function buildProfilePageData(
  user: User | null,
  profile: UserProfile | null
): ProfilePageData {
  const userData = user as ProfileUser | null
  const role = userData?.role ?? ''
  const roleLabel = isUserRole(role) ? USER_ROLE_LABELS[role] : 'User'

  const fullName =
    joinName(profile?.firstName, profile?.lastName) ||
    userData?.name ||
    joinName(userData?.firstName, userData?.lastName)
  const joinedRaw = profile?.updatedAt ?? userData?.updatedAt ?? userData?.createdAt

  const joinedDate = joinedRaw
    ? (() => {
        const d = new Date(joinedRaw)
        return Number.isNaN(d.getTime())
          ? joinedRaw
          : d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      })()
    : profileDummyData.joinedDate

  const agencySource = userData?.agency
  const agency = agencySource
    ? {
        name: agencySource.name ?? '—',
        logo: agencySource.logo ?? null,
        phone: agencySource.phone ?? '—',
        country: agencySource.country ?? '—',
        city: agencySource.city ?? '—',
      }
    : undefined

  const hotelSource = userData?.hotel
  const colors = hotelSource?.branding?.colors
  const hotel = hotelSource
    ? {
        name: hotelSource.basicInfo?.name ?? '—',
        phone: hotelSource.basicInfo?.phone ?? '—',
        city: hotelSource.basicInfo?.city ?? '—',
        address: hotelSource.basicInfo?.address ?? '—',
        currency: hotelSource.basicInfo?.currency ?? '—',
        managerId: hotelSource.managerId ?? '—',
        brandColors: [colors?.primary, colors?.secondary, colors?.tertiary].filter(
          (c): c is string => Boolean(c)
        ),
      }
    : undefined

  return {
    hero: {
      name: fullName,
      email: profile?.email ?? userData?.email ?? '',
      title: roleLabel,
      bio: userData?.bio ?? profileDummyData.bio,
      location: userData?.location ?? profileDummyData.location,
      joinedDate,
      social: {
        github: userData?.social?.github ?? profileDummyData.social.github,
        linkedin: userData?.social?.linkedin ?? profileDummyData.social.linkedin,
        twitter: userData?.social?.twitter ?? profileDummyData.social.twitter,
        website: userData?.social?.website ?? profileDummyData.social.website,
      },
    },
    overview: {
      name: fullName,
      email: profile?.email ?? userData?.email ?? '',
      phone: profile?.phoneNumber ?? userData?.phoneNumber ?? '',
      birthDate: profile?.dateOfBirth ?? userData?.dateOfBirth ?? '',
      gender: profile?.gender ?? userData?.gender ?? '',
    },
    agency,
    hotel,
  }
}
