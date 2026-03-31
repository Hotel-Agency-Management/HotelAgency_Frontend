'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { SupportStats } from './components/SupportStats';
import { TicketDetailsDrawer } from './components/TicketDetailsDrawer';
import { TicketFiltersBar } from './components/TicketFilters';
import { TicketsTable } from './components/TicketsTable';
import { applyTicketFilters } from './util/utils';
import { DEFAULT_FILTERS } from './constant/tickets';
import { Ticket, TicketFilters } from '@/core/types/supportTickets';
import { MOCK_TICKETS, MOCK_STATS } from './data/supportTickets';


function PageHeader() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        pb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 3,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="h5"
              fontWeight={700}
              letterSpacing={-0.5}
              color="text.primary"
            >
              Support & Ticket Visibility
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              maxWidth: 540,
              lineHeight: 1.8,
              fontSize: '0.85rem',
            }}
          >
            Monitor and manage all tenant support requests in one place — with real-time
            SLA tracking, escalation visibility, and agent assignment control.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}


export default function SupportTicketsPage() {
  const [filters, setFilters] = useState<TicketFilters>(DEFAULT_FILTERS);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const loading = false;

  const filteredTickets = useMemo(
    () => applyTicketFilters(MOCK_TICKETS, filters),
    [filters],
  );

  const isFiltered =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.status !== DEFAULT_FILTERS.status ||
    filters.priority !== DEFAULT_FILTERS.priority ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.assignedTo !== DEFAULT_FILTERS.assignedTo ||
    filters.overdueOnly !== DEFAULT_FILTERS.overdueOnly;

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    // Delay clearing so drawer animation completes
    setTimeout(() => setSelectedTicket(null), 300);
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <PageHeader />

        <Box mb={3}>
          <SupportStats stats={MOCK_STATS} loading={loading} />
        </Box>

        <Box mb={2}>
          <TicketFiltersBar
            filters={filters}
            onChange={setFilters}
            resultCount={filteredTickets.length}
          />
        </Box>

        <TicketsTable
          tickets={filteredTickets}
          loading={loading}
          onSelectTicket={handleSelectTicket}
          isFiltered={isFiltered}
        />
      </Container>

      <TicketDetailsDrawer
        ticket={selectedTicket}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </Box>
  );
}
