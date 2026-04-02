export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'pending_tenant'
  | 'escalated'
  | 'resolved'
  | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type TicketCategory =
  | 'billing'
  | 'booking_sync'
  | 'onboarding'
  | 'technical'
  | 'feature_request'
  | 'subscription'
  | 'property_import'
  | 'access'
  | 'other';

export type SLAStatus = 'on_track' | 'at_risk' | 'breached';

export type EscalationLevel = 0 | 1 | 2 | 3;

export interface TicketMessage {
  id: string;
  authorName: string;
  authorEmail: string;
  authorRole: 'tenant' | 'admin' | 'system';
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
  status: TicketStatus | 'all';
  priority: TicketPriority | 'all';
  category: TicketCategory | 'all';
  assignedTo: string | 'all';
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
