export interface AgencyFormData {
  agencyName: string
  phone: string
  city: string
}

export interface AgencySignupFormProps {
  onBack: () => void
  onSubmit: (data: AgencyFormData) => Promise<void>
  isLoading?: boolean
  defaultValues?: AgencyFormData
}
