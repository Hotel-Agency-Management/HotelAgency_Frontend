import type { User } from '@/core/configs/authConfig'
import { USER_ROLE_LABELS, isUserRole } from '@/lib/abilities'
import { profileDummyData } from '@/lib/profileDummyData'
import type { ProfilePageData, ProfileSocialLinks } from '../types/profile'

type ProfileUser = User & {
  social?: Partial<ProfileSocialLinks>
  location?: string
  bio?: string
}

export function buildProfilePageData(user: User | null): ProfilePageData {
  const u = user as ProfileUser | null
  const role = u?.role ?? ''
  const roleLabel = isUserRole(role) ? USER_ROLE_LABELS[role] : 'User'

  const fullName =
    (u?.name ?? [u?.firstName, u?.lastName].filter(Boolean).join(' ')) ||
    profileDummyData.name

  const joinedRaw = u?.createdAt ?? u?.updatedAt
  const joinedDate = joinedRaw
    ? (() => {
        const d = new Date(joinedRaw)
        return Number.isNaN(d.getTime())
          ? joinedRaw
          : d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      })()
    : profileDummyData.joinedDate

  const agencySource = u?.agency
  const agency = agencySource
    ? {
        name: agencySource.name ?? '—',
        logo: agencySource.logo ?? null,
        phone: agencySource.phone ?? '—',
        country: agencySource.country ?? '—',
        city: agencySource.city ?? '—',
      }
    : undefined

  const hotelSource = u?.hotel
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
      email: u?.email ?? profileDummyData.email,
      title: roleLabel,
      bio: u?.bio ?? profileDummyData.bio,
      location: u?.location ?? profileDummyData.location,
      joinedDate,
      social: {
        github: u?.social?.github ?? profileDummyData.social.github,
        linkedin: u?.social?.linkedin ?? profileDummyData.social.linkedin,
        twitter: u?.social?.twitter ?? profileDummyData.social.twitter,
        website: u?.social?.website ?? profileDummyData.social.website,
      },
    },
    overview: {
      name: fullName,
      email: u?.email ?? profileDummyData.email,
      phone: u?.phoneNumber ?? '',
      birthDate: u?.dateOfBirth ?? '',
      gender: u?.gender ?? '',
    },
    agency,
    hotel,
  }
}
