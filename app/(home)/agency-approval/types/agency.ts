import { LucideIcon } from "lucide-react"

export type AgencyStatus = 'pending' | 'approved' | 'rejected'

export interface AgencyRequest {
  id: string
  agencyName: string
  ownerName: string
  email: string
  phone: string
  location: string
  country: string
  submittedAt: string
  status: AgencyStatus
  description: string
  logoInitials: string
  avatarColor: string
  website?: string
  registrationNumber?: string
}

export type FilterStatus = 'all' | AgencyStatus

export interface FilterState {
  search: string
  status: FilterStatus
  sortBy: 'newest' | 'oldest' | 'name'
}

export type ActionType = 'approve' | 'reject'

export interface ConfirmDialogState {
  open: boolean
  action: ActionType | null
  request: AgencyRequest | null
}

export type ActionConfig = {
  title: string
  message: (name: string) => string
  confirmLabel: string
  colorKey: 'success' | 'error'
  Icon: LucideIcon
}

export type StatusColorKey = 'warning' | 'success' | 'error'
export interface StatusConfig {
  label: string
  colorKey: StatusColorKey
}


