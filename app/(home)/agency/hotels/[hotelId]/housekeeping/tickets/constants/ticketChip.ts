import type { TFunction } from 'i18next'
import { HOUSEKEEPING_TICKET_PRIORITY, HOUSEKEEPING_TICKET_STATUS } from './ticket'
import type { HousekeepingTicketPriority, HousekeepingTicketStatus } from '../types/ticket'

export function getPriorityLabels(t: TFunction): Record<HousekeepingTicketPriority, string> {
  return {
    [HOUSEKEEPING_TICKET_PRIORITY.LOW]: t('housekeeping.tickets.priority.LOW', { defaultValue: 'Low' }),
    [HOUSEKEEPING_TICKET_PRIORITY.MEDIUM]: t('housekeeping.tickets.priority.MEDIUM', { defaultValue: 'Medium' }),
    [HOUSEKEEPING_TICKET_PRIORITY.HIGH]: t('housekeeping.tickets.priority.HIGH', { defaultValue: 'High' }),
    [HOUSEKEEPING_TICKET_PRIORITY.URGENT]: t('housekeeping.tickets.priority.URGENT', { defaultValue: 'Urgent' }),
  }
}

export function getStatusLabels(t: TFunction): Record<HousekeepingTicketStatus, string> {
  return {
    [HOUSEKEEPING_TICKET_STATUS.TO_DO]: t('housekeeping.tickets.status.TO_DO', { defaultValue: 'To Do' }),
    [HOUSEKEEPING_TICKET_STATUS.IN_PROGRESS]: t('housekeeping.tickets.status.IN_PROGRESS', { defaultValue: 'In Progress' }),
    [HOUSEKEEPING_TICKET_STATUS.REVIEW]: t('housekeeping.tickets.status.REVIEW', { defaultValue: 'Review' }),
    [HOUSEKEEPING_TICKET_STATUS.DONE]: t('housekeeping.tickets.status.DONE', { defaultValue: 'Done' })
  }
}

/** @deprecated Use getPriorityLabels(t) for translated labels. */
export const PRIORITY_LABELS: Record<HousekeepingTicketPriority, string> = {
  [HOUSEKEEPING_TICKET_PRIORITY.LOW]: 'Low',
  [HOUSEKEEPING_TICKET_PRIORITY.MEDIUM]: 'Medium',
  [HOUSEKEEPING_TICKET_PRIORITY.HIGH]: 'High',
  [HOUSEKEEPING_TICKET_PRIORITY.URGENT]: 'Urgent',
}

/** @deprecated Use getStatusLabels(t) for translated labels. */
export const STATUS_LABELS: Record<HousekeepingTicketStatus, string> = {
  [HOUSEKEEPING_TICKET_STATUS.TO_DO]: 'To Do',
  [HOUSEKEEPING_TICKET_STATUS.IN_PROGRESS]: 'In Progress',
  [HOUSEKEEPING_TICKET_STATUS.REVIEW]: 'Review',
  [HOUSEKEEPING_TICKET_STATUS.DONE]: 'Done'
}
