import { TicketFilters, Ticket } from '@/core/types/supportTickets'
import { useMemo, useState } from 'react'
import { DEFAULT_FILTERS } from '../constant/tickets'
import { MOCK_TICKETS } from '../data/supportTickets'
import { applyTicketFilters } from '../util/utils'


export function useSupportTickets() {
  const [filters, setFilters] = useState<TicketFilters>(DEFAULT_FILTERS)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const loading = false

  const filteredTickets = useMemo(
    () => applyTicketFilters(MOCK_TICKETS, filters),
    [filters]
  )

  const isFiltered =
    filters.search !== DEFAULT_FILTERS.search ||
    filters.status !== DEFAULT_FILTERS.status ||
    filters.priority !== DEFAULT_FILTERS.priority ||
    filters.category !== DEFAULT_FILTERS.category ||
    filters.assignedTo !== DEFAULT_FILTERS.assignedTo ||
    filters.overdueOnly !== DEFAULT_FILTERS.overdueOnly

  const handleFilterChange = (partial: Partial<TicketFilters>) => {
    setFilters(prev => ({ ...prev, ...partial }))
  }

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setDrawerOpen(false)
    setTimeout(() => setSelectedTicket(null), 300)
  }

  return {
    loading,
    filters,
    setFilters,
    filteredTickets,
    isFiltered,
    selectedTicket,
    drawerOpen,
    handleFilterChange,
    handleResetFilters,
    handleSelectTicket,
    handleCloseDrawer,
  }
}
