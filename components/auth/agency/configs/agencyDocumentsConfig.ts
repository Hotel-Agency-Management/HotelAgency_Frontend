export interface UploadAgencyDocumentPayload {
  file: File
  documentType: string
}

export interface UploadAgencyDocumentResponse {
  id: number
  documentType: string
  url: string
}
