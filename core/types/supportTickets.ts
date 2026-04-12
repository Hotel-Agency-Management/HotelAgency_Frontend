export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  PENDING_TENANT: 'pending_tenant',
  ESCALATED: 'escalated',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;

export const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const TICKET_CATEGORY = {
  BILLING: 'billing',
  BOOKING_SYNC: 'booking_sync',
  ONBOARDING: 'onboarding',
  TECHNICAL: 'technical',
  FEATURE_REQUEST: 'feature_request',
  SUBSCRIPTION: 'subscription',
  PROPERTY_IMPORT: 'property_import',
  ACCESS: 'access',
  OTHER: 'other',
} as const;

export const SLA_STATUS = {
  ON_TRACK: 'on_track',
  AT_RISK: 'at_risk',
  BREACHED: 'breached',
} as const;

export const TICKET_AUTHOR_ROLE = {
  TENANT: 'tenant',
  ADMIN: 'admin',
  SYSTEM: 'system',
} as const;

export const TICKET_FILTER_ALL = 'all';

export type TicketStatus = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
export type TicketPriority = (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY];
export type TicketCategory = (typeof TICKET_CATEGORY)[keyof typeof TICKET_CATEGORY];
export type SLAStatus = (typeof SLA_STATUS)[keyof typeof SLA_STATUS];
export type TicketAuthorRole = (typeof TICKET_AUTHOR_ROLE)[keyof typeof TICKET_AUTHOR_ROLE];
export type TicketFilterAll = typeof TICKET_FILTER_ALL;

export type EscalationLevel = 0 | 1 | 2 | 3;

export interface TicketMessage {
  id: string;
  authorName: string;
  authorEmail: string;
  authorRole: TicketAuthorRole;
  body: string;
  attachments?: string[];
  createdAt: string;
}

export interface InternalNote {
  id: string;
  authorName: string;
  authorEmail: string;
  body: string;
  createdAt: string;
}

export interface Agency {
  id: string;
  name: string;
  planName: string;
  logoInitials: string;
  logoColor: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  agency: Agency;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string | null;
  assignedToEmail: string | null;
  createdAt: string;
  updatedAt: string;
  lastReplyAt: string;
  slaStatus: SLAStatus;
  slaDeadline: string;
  escalationLevel: EscalationLevel;
  contactName: string;
  contactEmail: string;
  messages: TicketMessage[];
  internalNotes: InternalNote[];
}

export interface TicketFilters {
  search: string;
  status: TicketStatus | TicketFilterAll;
  priority: TicketPriority | TicketFilterAll;
  category: TicketCategory | TicketFilterAll;
  assignedTo: string | TicketFilterAll;
  overdueOnly: boolean;
  dateFrom: string;
  dateTo: string;
}

export interface SupportStats {
  totalTickets: number;
  openTickets: number;
  inProgress: number;
  overdue: number;
  resolvedToday: number;
  avgResponseTimeHours: number;
}
