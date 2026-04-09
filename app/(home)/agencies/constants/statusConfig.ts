import { AgencyStatus } from "../types/agency";

export const statusConfig: Record<AgencyStatus, { label: string; color: 'success' | 'warning' | 'error' }> = {
  approval: { label: 'Approved', color: 'success' },
  pending: { label: 'Pending', color: 'warning' },
  rejected: { label: 'Rejected', color: 'error' }
}
