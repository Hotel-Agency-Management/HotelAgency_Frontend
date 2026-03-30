'use client';

import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { X, CheckCircle2 } from 'lucide-react';
import { TicketStatusChip, TicketPriorityChip } from './TicketChips';
import {
  CATEGORY_LABELS,
  TICKET_STATUSES,
  TICKET_PRIORITIES,
  SUPPORT_AGENTS,
} from '@/core/constant/tickets';
import type { Ticket } from '@/core/types/supportTickets';
import { formatDateTime, getAgentInitials } from './utils';

const DRAWER_WIDTH = 480;

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <Stack direction="row" spacing={2} py={1} alignItems="flex-start">
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        sx={{ minWidth: 100, mt: 0.3 }}
      >
        {label}
      </Typography>
      <Box flex={1}>{children}</Box>
    </Stack>
  );
}

interface TicketDetailsDrawerProps {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
}

export function TicketDetailsDrawer({
  ticket,
  open,
  onClose,
}: TicketDetailsDrawerProps) {
  const theme = useTheme();

  if (!ticket) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: DRAWER_WIDTH },
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography
                variant="caption"
                fontWeight={700}
                color="primary"
                sx={{ fontFamily: 'monospace' }}
              >
                {ticket.id}
              </Typography>
              <TicketPriorityChip priority={ticket.priority} />
              <TicketStatusChip status={ticket.status} />
            </Stack>

            <Typography variant="subtitle1" fontWeight={700}>
              {ticket.subject}
            </Typography>
          </Stack>

          <IconButton size="small" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ p: 3, overflowY: 'auto' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          {ticket.description}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <InfoRow label="Agency">
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: '0.7rem',
                bgcolor: ticket.agency.logoColor,
              }}
            >
              {ticket.agency.logoInitials}
            </Avatar>
            <Typography variant="body2" fontWeight={500}>
              {ticket.agency.name}
            </Typography>
            <Chip label={ticket.agency.planName} size="small" variant="outlined" />
          </Stack>
        </InfoRow>

        <InfoRow label="Contact">
          <Stack spacing={0.25}>
            <Typography variant="body2">{ticket.contactName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {ticket.contactEmail}
            </Typography>
          </Stack>
        </InfoRow>

        <InfoRow label="Category">
          <Typography variant="body2">{CATEGORY_LABELS[ticket.category]}</Typography>
        </InfoRow>

        <InfoRow label="Created">
          <Typography variant="body2">{formatDateTime(ticket.createdAt)}</Typography>
        </InfoRow>

        <InfoRow label="Assigned To">
          {ticket.assignedTo ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '0.7rem',
                  bgcolor: theme.palette.primary.light,
                }}
              >
                {getAgentInitials(ticket.assignedTo)}
              </Avatar>
              <Typography variant="body2">{ticket.assignedTo}</Typography>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Unassigned
            </Typography>
          )}
        </InfoRow>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select label="Status" defaultValue={ticket.status}>
              {TICKET_STATUSES.filter((s) => s.value !== 'all').map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Priority</InputLabel>
            <Select label="Priority" defaultValue={ticket.priority}>
              {TICKET_PRIORITIES.filter((p) => p.value !== 'all').map((p) => (
                <MenuItem key={p.value} value={p.value}>
                  {p.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Assign Agent</InputLabel>
            <Select label="Assign Agent" defaultValue={ticket.assignedTo ?? ''}>
              {SUPPORT_AGENTS.filter((a) => a.value !== 'all').map((a) => (
                <MenuItem key={a.value} value={a.value}>
                  {a.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<CheckCircle2 size={16} />}
          >
            Resolve Ticket
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
