import { AgencyStatus, StatusConfig } from "../types/agency"

export interface StatusChipProps {
  status: AgencyStatus
}

export const STATUS_CONFIG: Record<AgencyStatus, StatusConfig> = {
  pending:  { label: 'Pending Review', colorKey: 'warning' },
  approved: { label: 'Approved',       colorKey: 'success' },
  rejected: { label: 'Rejected',       colorKey: 'error'   },
}
