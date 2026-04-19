import apiClient from "@/core/clients/apiClient"
import { UploadAgencyDocumentPayload, UploadAgencyDocumentResponse } from "../configs/agencyDocumentsConfig"

export const uploadAgencyDocument = async (
  agencyId: number,
  payload: UploadAgencyDocumentPayload,
  accessToken?: string
): Promise<UploadAgencyDocumentResponse> => {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)
  const headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await apiClient.post<UploadAgencyDocumentResponse>(
    `/agencies/${agencyId}/documents`,
    formData,
    { headers }
  )

  return response.data
}

export const getAgencyDocuments = async (
  agencyId: number,
): Promise<UploadAgencyDocumentResponse> => {
  const response = await apiClient.get<UploadAgencyDocumentResponse>(
    `/agencies/${agencyId}/documents`
  )

  return response.data
}

export const updateAgencyDocument = async (
  agencyId: number,
  documentId: number,
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> => {
  const formData = new FormData()
  formData.append('File', payload.file)
  formData.append('documentType', payload.documentType)

  const response = await apiClient.put<UploadAgencyDocumentResponse>(
    `/agencies/${agencyId}/documents/${documentId}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return response.data
}
