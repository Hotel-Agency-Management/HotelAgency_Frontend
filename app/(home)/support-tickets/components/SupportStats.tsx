'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Ticket, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SupportStats as SupportStatsType } from '@/core/types/supportTickets';
import Avatar from '@/components/ui/Avatar';

type AccentColor = 'primary' | 'success' | 'error' | 'warning' | 'info';

interface StatCardProps {
  title: string;
  value: string | number;
  helper?: string;
  icon: React.ReactNode;
  accentColor: AccentColor;
  loading?: boolean;
}

function StatCard({ title, value, helper, icon, accentColor, loading }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          flex: 1,
          display: 'flex',
          '&:last-child': { pb: 2.5 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ width: '100%', height: '100%' }}
        >
          <Stack
            spacing={0.5}
            minWidth={0}
            justifyContent="space-between"
            sx={{ height: '100%', flex: 1 }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
                letterSpacing={0.5}
                textTransform="uppercase"
              >
                {title}
              </Typography>

              {loading ? (
                <Skeleton width={60} height={36} />
              ) : (
                <Typography variant="h4" fontWeight={700} lineHeight={1.2} color="text.primary">
                  {value}
                </Typography>
              )}
            </Box>

            {helper ? (
              <Typography variant="caption" color="text.secondary">
                {loading ? <Skeleton width={90} /> : helper}
              </Typography>
            ) : (
              <Box />
            )}
          </Stack>

          <Avatar variant="soft" color={accentColor} sx={{ flexShrink: 0 }}>
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

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
