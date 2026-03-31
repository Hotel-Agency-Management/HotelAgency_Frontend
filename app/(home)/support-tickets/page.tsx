'use client';

import {
  Box,
  Container,
  Stack,
} from '@mui/material';

import { SupportStats } from './components/SupportStats';
import { TicketDetailsDrawer } from './components/TicketDetailsDrawer';
import { TicketFiltersBar } from './components/TicketFilters';
import { TicketsTable } from './components/TicketsTable';
import { MOCK_STATS } from './data/supportTickets';
import { PageHeader } from './components/PageHeader';
import { useSupportTickets } from './hooks/useSupportTickets';

export default function SupportTicketsPage() {
  const {
    loading,
    filters,
    filteredTickets,
    isFiltered,
    selectedTicket,
    setFilters,
    drawerOpen,
    handleSelectTicket,
    handleCloseDrawer,
  } = useSupportTickets();

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
        <Stack spacing={4}>
          <PageHeader />

          <SupportStats stats={MOCK_STATS} loading={loading} />

          <TicketFiltersBar
            filters={filters}
            onChange={setFilters}
            resultCount={filteredTickets.length}
          />

          <TicketsTable
            tickets={filteredTickets}
            loading={loading}
            onSelectTicket={handleSelectTicket}
            isFiltered={isFiltered}
          />
        </Stack>
      </Container>

      <TicketDetailsDrawer
        ticket={selectedTicket}
        open={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </Box>
  );
}
