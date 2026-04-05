import { CheckCircle, XCircle } from "lucide-react"
import { ActionType, ActionConfig } from "../types/agency"

export const ACTION_CONFIG: Record<ActionType, ActionConfig> = {
  approve: {
    title: 'Approve Agency Registration',
    message: name =>
      `You are about to approve "${name}". They will receive an email notification and gain access to the platform immediately.`,
    confirmLabel: 'Approve',
    colorKey: 'success',
    Icon: CheckCircle,
  },
  reject: {
    title: 'Reject Agency Registration',
    message: name =>
      `You are about to reject "${name}". They will be notified by email. This action can be undone later if needed.`,
    confirmLabel: 'Reject',
    colorKey: 'error',
    Icon: XCircle,
  },
}
