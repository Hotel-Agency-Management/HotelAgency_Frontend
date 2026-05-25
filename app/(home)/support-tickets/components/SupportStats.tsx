'use client';

import {
  Grid,
} from '@mui/material';
import { Ticket, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SupportStats as SupportStatsType } from '@/core/types/supportTickets';
import { StatCard, StatCardProps } from './StatCard';

interface SupportStatsProps {
  stats: SupportStatsType;
  loading?: boolean;
}

export function SupportStats({ stats, loading = false }: SupportStatsProps) {
  const { t } = useTranslation();
  const iconProps = {
    size: 18,
    strokeWidth: 1.8,
  };

  const statCards: StatCardProps[] = [
    {
      title: t('supportTickets.stats.totalTickets', { defaultValue: 'Total Tickets' }),
      value: stats.totalTickets,
      helper: t('supportTickets.stats.allTime', { defaultValue: 'All time' }),
      icon: <Ticket {...iconProps} />,
      accentColor: 'primary',
    },
    {
      title: t('supportTickets.stats.inProgress', { defaultValue: 'In Progress' }),
      value: stats.inProgress,
      helper: t('supportTickets.stats.activelyWorked', { defaultValue: 'Actively being worked' }),
      icon: <RefreshCw {...iconProps} />,
      accentColor: 'info',
    },
    {
      title: t('supportTickets.stats.overdue', { defaultValue: 'Overdue' }),
      value: stats.overdue,
      helper: t('supportTickets.stats.slaBreached', { defaultValue: 'SLA breached' }),
      icon: <AlertTriangle {...iconProps} />,
      accentColor: 'error',
    },
    {
      title: t('supportTickets.stats.resolvedToday', { defaultValue: 'Resolved Today' }),
      value: stats.resolvedToday,
      helper: t('supportTickets.stats.sinceMidnight', { defaultValue: 'Since midnight UTC' }),
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
