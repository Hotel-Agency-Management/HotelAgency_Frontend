'use client'

import { useMemo } from 'react'
import { useGetAdminAgencyProfile } from '../hooks/queries/useAdminAgencyProfile'
import { useGetAdminAgencyDocuments } from '../hooks/queries/useAdminAgencyDocuments'
import { useAdminUpdateAgencyProfile } from '../hooks/mutations/useAdminAgencyProfileMutations'
import { useAdminUpdateAgencyDocument } from '../hooks/mutations/useAdminAgencyDocumentMutations'
import { mapAgencyProfile, mapDocumentToFileItem } from '@/app/(home)/agency/util/agencyProfileUtils'
import { AgencyProfileTab } from '@/app/(home)/agency/components/agencyProfile/AgencyProfileTab'
import type { AgencyProfile } from '@/app/(home)/agency/types/agencyProfile'

interface Props {
  agencyId: number
}

export function AdminAgencyProfileSection({ agencyId }: Props) {
  const { data: agencyProfile, isLoading } = useGetAdminAgencyProfile(agencyId)
  const { data: rawDocuments, isLoading: isDocumentsLoading } = useGetAdminAgencyDocuments(agencyId)
  const updateProfile = useAdminUpdateAgencyProfile(agencyId)
  const updateDocument = useAdminUpdateAgencyDocument(agencyId)

  const profileValues = useMemo(() => mapAgencyProfile(agencyProfile), [agencyProfile])
  const documents = useMemo(() => (rawDocuments ?? []).map(mapDocumentToFileItem), [rawDocuments])

  const handleSave = async (data: AgencyProfile) => {
    await updateProfile.mutateAsync({
      agencyName: data.name,
      phone: data.phone,
      country: data.country,
      city: data.city,
      planId: data.planId,
    })
  }

  const handleFileReplace = (fileId: string, newFile: File) => {
    const doc = documents.find(d => d.id === fileId)
    if (!doc) return
    updateDocument.mutate({ documentId: parseInt(fileId), payload: { file: newFile, documentType: doc.documentType } })
  }

  return (
    <AgencyProfileTab
      defaultValues={profileValues}
      onSave={handleSave}
      isLoading={isLoading}
      documents={documents}
      isDocumentsLoading={isDocumentsLoading}
      onFileReplace={handleFileReplace}
    />
  )
}
