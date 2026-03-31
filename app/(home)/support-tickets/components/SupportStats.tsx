'use client';

import {
  Grid,
} from '@mui/material';
import { Ticket, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SupportStats as SupportStatsType } from '@/core/types/supportTickets';
import { StatCard, StatCardProps } from './StatCard';

interface SupportStatsProps {
  stats: SupportStatsType;
  loading?: boolean;
}

export function SupportStats({ stats, loading = false }: SupportStatsProps) {
  const iconProps = {
    size: 18,
    strokeWidth: 1.8,
  };

  const statCards: StatCardProps[] = [
    {
      title: 'Total Tickets',
      value: stats.totalTickets,
      helper: 'All time',
      icon: <Ticket {...iconProps} />,
      accentColor: 'primary',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      helper: 'Actively being worked',
      icon: <RefreshCw {...iconProps} />,
      accentColor: 'info',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      helper: 'SLA breached',
      icon: <AlertTriangle {...iconProps} />,
      accentColor: 'error',
    },
    {
      title: 'Resolved Today',
      value: stats.resolvedToday,
      helper: 'Since midnight UTC',
      icon: <CheckCircle2 {...iconProps} />,
      accentColor: 'success',
    },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      {statCards.map((card) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
          <StatCard {...card} loading={loading} />
        </Grid>
      ))}
    </Grid>
  );
}
