import apiClient from "@/core/clients/apiClient"
import { UploadAgencyDocumentPayload, UploadAgencyDocumentResponse } from "../configs/agencyDocumentsConfig"

export const uploadAgencyDocument = async (
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
    '/agencies/documents',
    formData,
    { headers }
  )

  return response.data
}

export const getAgencyDocuments = async (): Promise<UploadAgencyDocumentResponse[]> => {
  const response = await apiClient.get<UploadAgencyDocumentResponse[]>('/agencies/documents')
  return response.data
}

export const updateAgencyDocument = async (
  documentId: number,
  payload: UploadAgencyDocumentPayload
): Promise<UploadAgencyDocumentResponse> => {
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
