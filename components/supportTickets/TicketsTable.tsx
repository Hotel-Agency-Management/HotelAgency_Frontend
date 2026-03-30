'use client';

import { useMemo } from 'react';
import {
  Avatar,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Theme,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { TicketStatusChip, TicketPriorityChip, SLAChip } from './TicketChips';
import { CATEGORY_LABELS } from '@/core/constant/tickets';
import { Ticket } from '@/core/types/supportTickets';
import { fromNow } from '@/core/utils/dateUtils';
import { getAgentInitials, formatRelativeTime, formatSLARemaining } from './utils';

//
type ColumnFactory = (deps: {
  theme: Theme;
  onSelectTicket: (ticket: Ticket) => void;
}) => GridColDef<Ticket>[];

const buildColumns: ColumnFactory = ({ theme }) => [
  {
    field: 'id',
    headerName: 'Ticket ID',
    width: 110,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="caption" fontWeight={600} color="primary" fontFamily="monospace">
        {value}
      </Typography>
    ),
  },
  {
    field: 'agency',
    headerName: 'Agency',
    width: 190,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams<Ticket>) => (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
        <Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: '0.65rem',
            fontWeight: 700,
            bgcolor: row.agency.logoColor,
            flexShrink: 0,
          }}
        >
          {row.agency.logoInitials}
        </Avatar>
        <Stack spacing={0}>
          <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
            {row.agency.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.agency.planName}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="body2" color="text.secondary" noWrap>
        {CATEGORY_LABELS[value as keyof typeof CATEGORY_LABELS]}
      </Typography>
    ),
  },
  {
    field: 'priority',
    headerName: 'Priority',
    width: 110,
    renderCell: ({ value }: GridRenderCellParams) => (
      <TicketPriorityChip priority={value} />
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: ({ value }: GridRenderCellParams) => (
      <TicketStatusChip status={value} />
    ),
  },
  {
    field: 'assignedTo',
    headerName: 'Assigned To',
    width: 160,
    renderCell: ({ value }: GridRenderCellParams) =>
      value ? (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
          <Avatar
            sx={{
              width: 22,
              height: 22,
              fontSize: '0.6rem',
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            {getAgentInitials(value)}
          </Avatar>
          <Typography variant="body2" noWrap>
            {value}
          </Typography>
        </Stack>
      ) : (
        <Typography variant="caption" color="text.disabled" fontStyle="italic">
          Unassigned
        </Typography>
      ),
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 120,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="caption" color="text.secondary" noWrap>
        {fromNow(value)}
      </Typography>
    ),
  },
  {
    field: 'lastReplyAt',
    headerName: 'Last Reply',
    width: 120,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="caption" color="text.secondary" noWrap>
        {formatRelativeTime(value)}
      </Typography>
    ),
  },
  {
    field: 'slaDeadline',
    headerName: 'SLA',
    width: 130,
    renderCell: ({ row }: GridRenderCellParams<Ticket>) => (
      <Tooltip title={formatSLARemaining(row.slaDeadline)}>
        <span>
          <SLAChip
            slaStatus={row.slaStatus}
            label={formatSLARemaining(row.slaDeadline)}
          />
        </span>
      </Tooltip>
    ),
  }
];

// ─── Main Component ──────────────────────────────────────────────────────────

interface TicketsTableProps {
  tickets: Ticket[];
  loading?: boolean;
  onSelectTicket: (ticket: Ticket) => void;
  isFiltered: boolean;
}

export function TicketsTable({
  tickets,
  loading = false,
  onSelectTicket,
}: TicketsTableProps) {
  const theme = useTheme();

  // useMemo: الأعمدة تتبنى مرة وحدة، ما بتتعاد إلا لو تغير theme أو onSelectTicket
  const columns = useMemo(
    () => buildColumns({ theme, onSelectTicket }),
    [theme, onSelectTicket],
  );

  return (
    <Paper
      elevation={0}
      sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2, overflow: 'hidden' }}
    >
      <DataGrid
        rows={tickets}
        columns={columns}
        loading={loading}
        autoHeight
        rowHeight={52}
        onRowClick={({ row }) => onSelectTicket(row)}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: theme.palette.grey[50],
            borderBottom: `2px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            color: 'text.secondary',
          },
          '& .MuiDataGrid-row': { cursor: 'pointer' },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-toolbarContainer': {
            px: 2,
            pt: 1.5,
            pb: 1,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </Paper>
  );
}
