import { AgencyStatus } from "@/components/agencyApproval";

export interface StatusChipProps {
  status: AgencyStatus
}

export const STATUS_CONFIG: Record<
  AgencyStatus,
  { label: string; colorKey: 'warning' | 'success' | 'error' }
> = {
  pending:  { label: 'Pending Review', colorKey: 'warning' },
  approved: { label: 'Approved',       colorKey: 'success' },
  rejected: { label: 'Rejected',       colorKey: 'error'   },
}
