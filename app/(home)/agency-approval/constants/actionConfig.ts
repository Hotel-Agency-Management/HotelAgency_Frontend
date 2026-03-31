import { LucideIcon, CheckCircle, XCircle } from "lucide-react"
import { ActionType } from "../types/agency"

export const ACTION_CONFIG: Record<
  ActionType,
  {
    title: string
    message: (name: string) => string
    confirmLabel: string
    colorKey: 'success' | 'error'
    Icon: LucideIcon
  }
> = {
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
