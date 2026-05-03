import apiClient from '@/core/clients/apiClient'
import type { UploadAgencyDocumentPayload, UploadAgencyDocumentResponse } from '@/components/auth/agency/configs/agencyDocumentsConfig'

export async function uploadAgencyDocumentSelf(
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)

  const response = await apiClient.post<UploadAgencyDocumentResponse>(
    '/agencies/documents',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function updateAgencyDocumentSelf(
  documentId: number,
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)

  const response = await apiClient.put<UploadAgencyDocumentResponse>(
    `/agencies/documents/${documentId}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

export async function getAgencyDocumentsSelf(): Promise<UploadAgencyDocumentResponse[]> {
  const response = await apiClient.get<UploadAgencyDocumentResponse[]>('/agencies/documents')
  return response.data
}
