'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import { TicketFilters } from '@/core/types/supportTickets';
import SearchInput from '@/components/common/SearchInput';
import { TICKET_STATUSES, TICKET_PRIORITIES, TICKET_CATEGORIES, SUPPORT_AGENTS } from '../constant/tickets';

interface TicketFiltersProps {
  filters: TicketFilters;
  onChange: (filters: TicketFilters) => void;
  resultCount: number;
}

export function TicketFiltersBar({ filters, onChange }: TicketFiltersProps) {
  const theme = useTheme();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [localSearch, setLocalSearch] = React.useState(filters.search);

  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        onChange({ ...filters, search: value });
      }, 300);
    },
    [filters, onChange],
  );

  const handleChange = useCallback(
    <K extends keyof TicketFilters>(key: K, value: TicketFilters[K]) => {
      onChange({ ...filters, [key]: value });
    },
    [filters, onChange],
  );

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Grid container spacing={1.5} alignItems="center">

        <Grid size={{ xs: 12, md: 5 }}>
          <SearchInput
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Search by subject, ID, or agency…"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 1.5 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={filters.status}
              onChange={(e) => handleChange('status', e.target.value as TicketFilters['status'])}
            >
              {TICKET_STATUSES.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 1.5 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority"
              value={filters.priority}
              onChange={(e) => handleChange('priority', e.target.value as TicketFilters['priority'])}
            >
              {TICKET_PRIORITIES.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 1.5 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value as TicketFilters['category'])}
            >
              {TICKET_CATEGORIES.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, sm: 4, md: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Assigned To</InputLabel>
            <Select
              label="Assigned To"
              value={filters.assignedTo}
              onChange={(e) => handleChange('assignedTo', e.target.value)}
            >
              {SUPPORT_AGENTS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </Box>
  );
}
