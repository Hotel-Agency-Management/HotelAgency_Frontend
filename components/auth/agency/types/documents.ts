export interface DocumentEntry {
  title: string
  file: File | null
}

export interface AgencyDocumentsFormData {
  documents: DocumentEntry[]
}

export interface AgencyDocumentsFormProps {
  onBack: () => void
  onSubmit: (data: AgencyDocumentsFormData) => Promise<void>
  isLoading?: boolean
  defaultValues?: AgencyDocumentsFormData
  submitLabel?: string
}
