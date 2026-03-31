'use client';

import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { TicketStatus, TicketPriority, SLAStatus } from '@/core/types/supportTickets';
import { STATUS_CONFIG, PRIORITY_CONFIG, SLA_CONFIG } from '../constant/tickets';

interface TicketStatusChipProps {
  status: TicketStatus;
  size?: ChipProps['size'];
}

export function TicketStatusChip({ status, size = 'small' }: TicketStatusChipProps) {
  const config = STATUS_CONFIG[status];
  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant="outlined"
      sx={{ fontWeight: 500 }}
    />
  );
}

interface TicketPriorityChipProps {
  priority: TicketPriority;
  size?: ChipProps['size'];
}

export function TicketPriorityChip({ priority, size = 'small' }: TicketPriorityChipProps) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant="filled"
      sx={{ fontWeight: 600 }}
    />
  );
}

interface SLAChipProps {
  slaStatus: SLAStatus;
  label?: string;
  size?: ChipProps['size'];
}

export function SLAChip({ slaStatus, label, size = 'small' }: SLAChipProps) {
  const config = SLA_CONFIG[slaStatus];
  return (
    <Chip
      label={label ?? config.label}
      color={config.color}
      size={size}
      variant="outlined"
      sx={{ fontWeight: 500 }}
    />
  );
}
