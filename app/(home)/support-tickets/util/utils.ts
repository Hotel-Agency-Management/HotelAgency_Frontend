import { SLAStatus, Ticket, TicketFilters } from '@/core/types/supportTickets';
import { formatDistanceToNow, format, differenceInHours, parseISO } from 'date-fns';

export function formatRelativeTime(dateString: string): string {
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return '—';
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy · HH:mm');
  } catch {
    return '—';
  }
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch {
    return '—';
  }
}

export function computeSLAStatus(slaDeadline: string): SLAStatus {
  const now = new Date();
  const deadline = parseISO(slaDeadline);
  const hoursRemaining = differenceInHours(deadline, now);

  if (hoursRemaining < 0) return 'breached';
  if (hoursRemaining < 4) return 'at_risk';
  return 'on_track';
}

export function formatSLARemaining(slaDeadline: string): string {
  const now = new Date();
  const deadline = parseISO(slaDeadline);
  const hoursRemaining = differenceInHours(deadline, now);

  if (hoursRemaining < 0) {
    return `Breached ${Math.abs(hoursRemaining)}h ago`;
  }
  if (hoursRemaining < 24) {
    return `${hoursRemaining}h remaining`;
  }
  const days = Math.floor(hoursRemaining / 24);
  return `${days}d remaining`;
}

export function getAgentInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function applyTicketFilters(tickets: Ticket[], filters: TicketFilters): Ticket[] {
  const searchLower = filters.search.toLowerCase();

  return tickets.filter((ticket) => {
    if (filters.search) {
      const matchesSearch =
        ticket.id.toLowerCase().includes(searchLower) ||
        ticket.subject.toLowerCase().includes(searchLower) ||
        ticket.agency.name.toLowerCase().includes(searchLower) ||
        ticket.contactName.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.status !== 'all' && ticket.status !== filters.status) return false;
    if (filters.priority !== 'all' && ticket.priority !== filters.priority) return false;
    if (filters.category !== 'all' && ticket.category !== filters.category) return false;

    if (filters.assignedTo !== 'all' && ticket.assignedTo !== filters.assignedTo) return false;

    if (filters.overdueOnly && ticket.slaStatus !== 'breached') return false;

    if (filters.dateFrom) {
      const from = parseISO(filters.dateFrom);
      const created = parseISO(ticket.createdAt);
      if (created < from) return false;
    }

    if (filters.dateTo) {
      const to = parseISO(filters.dateTo);
      const created = parseISO(ticket.createdAt);
      if (created > to) return false;
    }

    return true;
  });
}

export function paginateTickets<T>(items: T[], page: number, rowsPerPage: number): T[] {
  return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
