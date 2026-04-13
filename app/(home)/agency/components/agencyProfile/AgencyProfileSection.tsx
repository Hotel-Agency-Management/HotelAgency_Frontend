'use client'
import { useMemo } from 'react'
import { useUpdateAgencyProfile } from '../../hooks/mutations/useAgencyProfileMutation'
import { useGetAgencyProfile } from '../../hooks/queries/useAgencyProfile'
import { AgencyProfile } from '../../types/agencyProfile'
import { mapAgencyProfile } from '../../util/agencyProfileUtils'
import { AgencyProfileTab } from './AgencyProfileTab'

export function AgencyProfileSection() {
  const { data: agencyProfile, isLoading } = useGetAgencyProfile()
  const updateAgencyProfile = useUpdateAgencyProfile()

  const profileValues = useMemo(() => mapAgencyProfile(agencyProfile), [agencyProfile])

  const handleSave = async (data: AgencyProfile) => {
    await updateAgencyProfile.mutateAsync({
      agencyName: data.name,
      phone: data.phone,
      country: data.country,
      city: data.city,
    })
  }

  return (
    <AgencyProfileTab
      defaultValues={profileValues}
      onSave={handleSave}
      isLoading={isLoading}
    />
  )
}
