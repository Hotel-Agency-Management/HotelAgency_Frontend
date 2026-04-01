import { SLAStatus, TicketCategory, TicketPriority, TicketStatus } from "../../../../core/types/supportTickets";

export const TICKET_STATUSES: { value: TicketStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'pending_tenant', label: 'Pending Tenant' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

export const TICKET_PRIORITIES: { value: TicketPriority | 'all'; label: string }[] = [
  { value: 'all', label: 'All Priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const TICKET_CATEGORIES: { value: TicketCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'billing', label: 'Billing' },
  { value: 'booking_sync', label: 'Booking Sync' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'technical', label: 'Technical' },
  { value: 'feature_request', label: 'Feature Request' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'property_import', label: 'Property Import' },
  { value: 'access', label: 'Access & Permissions' },
  { value: 'other', label: 'Other' },
];

export const SUPPORT_AGENTS = [
  { value: 'all', label: 'All Agents' },
  { value: 'Sarah Mitchell', label: 'Sarah Mitchell' },
  { value: 'James Okonkwo', label: 'James Okonkwo' },
  { value: 'Priya Nair', label: 'Priya Nair' },
  { value: 'Daniel Ruiz', label: 'Daniel Ruiz' },
];

export const STATUS_CONFIG: Record<TicketStatus, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
  open: { label: 'Open', color: 'info' },
  in_progress: { label: 'In Progress', color: 'primary' },
  pending_tenant: { label: 'Pending Tenant', color: 'warning' },
  escalated: { label: 'Escalated', color: 'error' },
  resolved: { label: 'Resolved', color: 'success' },
  closed: { label: 'Closed', color: 'default' },
};

export const PRIORITY_CONFIG: Record<TicketPriority, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' }> = {
  critical: { label: 'Critical', color: 'error' },
  high: { label: 'High', color: 'warning' },
  medium: { label: 'Medium', color: 'primary' },
  low: { label: 'Low', color: 'default' },
};

export const SLA_CONFIG: Record<SLAStatus, { label: string; color: 'success' | 'warning' | 'error' }> = {
  on_track: { label: 'On Track', color: 'success' },
  at_risk: { label: 'At Risk', color: 'warning' },
  breached: { label: 'Breached', color: 'error' },
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  billing: 'Billing',
  booking_sync: 'Booking Sync',
  onboarding: 'Onboarding',
  technical: 'Technical',
  feature_request: 'Feature Request',
  subscription: 'Subscription',
  property_import: 'Property Import',
  access: 'Access & Permissions',
  other: 'Other',
};

export const DEFAULT_FILTERS = {
  search: '',
  status: 'all' as const,
  priority: 'all' as const,
  category: 'all' as const,
  assignedTo: 'all',
  overdueOnly: false,
  dateFrom: '',
  dateTo: '',
};

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];
export const DEFAULT_ROWS_PER_PAGE = 10;
export const DRAWER_WIDTH = 480;

