'use client'
import { useMemo } from 'react'
import { useUpdateAgencyProfile } from '../../hooks/mutations/useAgencyProfileMutation'
import { useGetAgencyProfile } from '../../hooks/queries/useAgencyProfile'
import { useGetAgencyDocuments } from '../../hooks/queries/useAgencyDocuments'
import { AgencyProfile } from '../../types/agencyProfile'
import { mapAgencyProfile, mapDocumentToFileItem } from '../../util/agencyProfileUtils'
import { AgencyProfileTab } from './AgencyProfileTab'
import { useUpdateAgencyDocument } from '../../hooks/mutations/useAgencyDocumentMutations'

export function AgencyProfileSection() {
  const { data: agencyProfile, isLoading } = useGetAgencyProfile()
  const { data: rawDocuments, isLoading: isDocumentsLoading } = useGetAgencyDocuments()
  const updateAgencyProfile = useUpdateAgencyProfile()
  const updateDocument = useUpdateAgencyDocument()

  const profileValues = useMemo(() => mapAgencyProfile(agencyProfile), [agencyProfile])
  const documents = useMemo(() => (rawDocuments ?? []).map(mapDocumentToFileItem), [rawDocuments])

  const handleSave = async (data: AgencyProfile) => {
    await updateAgencyProfile.mutateAsync({
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
