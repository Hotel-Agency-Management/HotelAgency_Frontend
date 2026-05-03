import apiClient from '@/core/clients/apiClient'
import type { UploadAgencyDocumentPayload, UploadAgencyDocumentResponse } from '@/components/auth/agency/configs/agencyDocumentsConfig'

export async function adminUploadAgencyDocument(
  agencyId: number,
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)

  const response = await apiClient.post<UploadAgencyDocumentResponse>(
    `/admin/agencies/${agencyId}/documents`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function adminUpdateAgencyDocument(
  agencyId: number,
  documentId: number,
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)

  const response = await apiClient.put<UploadAgencyDocumentResponse>(
    `/admin/agencies/${agencyId}/documents/${documentId}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function adminGetAgencyDocuments(
  agencyId: number
): Promise<UploadAgencyDocumentResponse[]> {
  const response = await apiClient.get<UploadAgencyDocumentResponse[]>(
    `/admin/agencies/${agencyId}/documents`
  )
  return response.data
}
