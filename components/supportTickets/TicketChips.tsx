'use client';

import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { PRIORITY_CONFIG, SLA_CONFIG, STATUS_CONFIG } from '@/core/constant/tickets';
import { TicketStatus, TicketPriority, SLAStatus } from '@/core/types/supportTickets';

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
      sx={{ fontWeight: 500, fontSize: '0.7rem', letterSpacing: 0.3 }}
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
      sx={{ fontWeight: 600, fontSize: '0.7rem', letterSpacing: 0.3 }}
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
      sx={{ fontWeight: 500, fontSize: '0.7rem', letterSpacing: 0.3 }}
    />
  );
}
