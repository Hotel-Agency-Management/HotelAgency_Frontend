import {
  SLA_STATUS,
  SLAStatus,
  TICKET_CATEGORY,
  TICKET_FILTER_ALL,
  TICKET_PRIORITY,
  TICKET_STATUS,
  TicketCategory,
  TicketFilters,
  TicketPriority,
  TicketStatus
} from "../../../../core/types/supportTickets";

export const TICKET_STATUSES: { value: TicketStatus | typeof TICKET_FILTER_ALL; label: string }[] = [
  { value: TICKET_FILTER_ALL, label: 'All Statuses' },
  { value: TICKET_STATUS.OPEN, label: 'Open' },
  { value: TICKET_STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: TICKET_STATUS.PENDING_TENANT, label: 'Pending Tenant' },
  { value: TICKET_STATUS.ESCALATED, label: 'Escalated' },
  { value: TICKET_STATUS.RESOLVED, label: 'Resolved' },
  { value: TICKET_STATUS.CLOSED, label: 'Closed' },
];

export const TICKET_PRIORITIES: { value: TicketPriority | typeof TICKET_FILTER_ALL; label: string }[] = [
  { value: TICKET_FILTER_ALL, label: 'All Priorities' },
  { value: TICKET_PRIORITY.CRITICAL, label: 'Critical' },
  { value: TICKET_PRIORITY.HIGH, label: 'High' },
  { value: TICKET_PRIORITY.MEDIUM, label: 'Medium' },
  { value: TICKET_PRIORITY.LOW, label: 'Low' },
];

export const TICKET_CATEGORIES: { value: TicketCategory | typeof TICKET_FILTER_ALL; label: string }[] = [
  { value: TICKET_FILTER_ALL, label: 'All Categories' },
  { value: TICKET_CATEGORY.BILLING, label: 'Billing' },
  { value: TICKET_CATEGORY.BOOKING_SYNC, label: 'Booking Sync' },
  { value: TICKET_CATEGORY.ONBOARDING, label: 'Onboarding' },
  { value: TICKET_CATEGORY.TECHNICAL, label: 'Technical' },
  { value: TICKET_CATEGORY.FEATURE_REQUEST, label: 'Feature Request' },
  { value: TICKET_CATEGORY.SUBSCRIPTION, label: 'Subscription' },
  { value: TICKET_CATEGORY.PROPERTY_IMPORT, label: 'Property Import' },
  { value: TICKET_CATEGORY.ACCESS, label: 'Access & Permissions' },
  { value: TICKET_CATEGORY.OTHER, label: 'Other' },
];

export const SUPPORT_AGENTS = [
  { value: TICKET_FILTER_ALL, label: 'All Agents' },
  { value: 'Sarah Mitchell', label: 'Sarah Mitchell' },
  { value: 'James Okonkwo', label: 'James Okonkwo' },
  { value: 'Priya Nair', label: 'Priya Nair' },
  { value: 'Daniel Ruiz', label: 'Daniel Ruiz' },
];

export const STATUS_CONFIG: Record<TicketStatus, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
  [TICKET_STATUS.OPEN]: { label: 'Open', color: 'info' },
  [TICKET_STATUS.IN_PROGRESS]: { label: 'In Progress', color: 'primary' },
  [TICKET_STATUS.PENDING_TENANT]: { label: 'Pending Tenant', color: 'warning' },
  [TICKET_STATUS.ESCALATED]: { label: 'Escalated', color: 'error' },
  [TICKET_STATUS.RESOLVED]: { label: 'Resolved', color: 'success' },
  [TICKET_STATUS.CLOSED]: { label: 'Closed', color: 'default' },
};

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
  [TICKET_PRIORITY.CRITICAL]: { label: 'Critical', color: 'error' },
  [TICKET_PRIORITY.HIGH]: { label: 'High', color: 'warning' },
  [TICKET_PRIORITY.MEDIUM]: { label: 'Medium', color: 'primary' },
  [TICKET_PRIORITY.LOW]: { label: 'Low', color: 'default' },
};

export const SLA_CONFIG: Record<SLAStatus, { label: string; color: 'success' | 'warning' | 'error' }> = {
  [SLA_STATUS.ON_TRACK]: { label: 'On Track', color: 'success' },
  [SLA_STATUS.AT_RISK]: { label: 'At Risk', color: 'warning' },
  [SLA_STATUS.BREACHED]: { label: 'Breached', color: 'error' },
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  [TICKET_CATEGORY.BILLING]: 'Billing',
  [TICKET_CATEGORY.BOOKING_SYNC]: 'Booking Sync',
  [TICKET_CATEGORY.ONBOARDING]: 'Onboarding',
  [TICKET_CATEGORY.TECHNICAL]: 'Technical',
  [TICKET_CATEGORY.FEATURE_REQUEST]: 'Feature Request',
  [TICKET_CATEGORY.SUBSCRIPTION]: 'Subscription',
  [TICKET_CATEGORY.PROPERTY_IMPORT]: 'Property Import',
  [TICKET_CATEGORY.ACCESS]: 'Access & Permissions',
  [TICKET_CATEGORY.OTHER]: 'Other',
};

export const DEFAULT_FILTERS: TicketFilters = {
  search: '',
  status: TICKET_FILTER_ALL,
  priority: TICKET_FILTER_ALL,
  category: TICKET_FILTER_ALL,
  assignedTo: TICKET_FILTER_ALL,
  overdueOnly: false,
  dateFrom: '',
  dateTo: '',
};

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];
export const DEFAULT_ROWS_PER_PAGE = 10;
export const DRAWER_WIDTH = 480;
