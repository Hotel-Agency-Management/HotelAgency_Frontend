import { AgencyStatus } from "@/components/auth/types/authType"
import { StatusConfig } from "../types/agency"

export interface StatusChipProps {
  status: AgencyStatus
}

export const STATUS_CONFIG: Record<AgencyStatus, StatusConfig> = {
  Pending:  { label: 'Pending Review', colorKey: 'warning' },
  Approved: { label: 'Approved',       colorKey: 'success' },
  Rejected: { label: 'Rejected',       colorKey: 'error'   },
  InComplete: { label: 'Incomplete',   colorKey: 'warning' },
}
