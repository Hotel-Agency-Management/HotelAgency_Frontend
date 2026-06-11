import { AgencyStatus } from "@/components/auth/types/authType";

export const statusConfig: Record<AgencyStatus, { label: string; color: 'success' | 'warning' | 'error' }> = {
  Active: { label: 'Active', color: 'success' },
  Pending: { label: 'Pending', color: 'warning' },
  Rejected: { label: 'Rejected', color: 'error' },
  InComplete: { label: 'Incomplete', color: 'warning' }
}
