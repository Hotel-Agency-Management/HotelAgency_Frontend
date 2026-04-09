import { fromNow } from "@/core/utils/Dateutils";
import { Stack, Avatar, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import AgencyStatusChip from "../components/AgencyStatusChip";
import { Agency } from "../types/agency";
import { PLAN_NAMES } from "./agencyConstants";

export const columns = (onAgencyClick: (agencyName: string) => void): GridColDef<Agency>[] => [
  {
    field: 'agency_name',
    headerName: 'Agency',
    flex: 1.5,
    minWidth: 200,
    renderCell: ({ row }) => (
      <Stack direction='row' alignItems='center' gap={1.5} sx={{ height: '100%' }}>
        <Avatar
          src={row.logo_url}
          alt={row.agency_name}
          sx={{ width: 32, height: 32, bgcolor: row.primary_color }}
        >
          {row.agency_name[0].toUpperCase()}
        </Avatar>
        <Stack>
          <Typography variant='body2' fontWeight={600}>
            {row.agency_name}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {row.email}
          </Typography>
        </Stack>
      </Stack>
    )
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    minWidth: 140,
  },
  {
    field: 'country',
    headerName: 'Location',
    flex: 1,
    minWidth: 140,
    renderCell: ({ row }) => (
      <Typography variant='body2'>
        {row.city}, {row.country}
      </Typography>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 120,
    renderCell: ({ row }) => <AgencyStatusChip status={row.status} />
  },
  {
    field: 'email_verified',
    headerName: 'Email Verified',
    flex: 0.8,
    minWidth: 120,
    renderCell: ({ row }) => (
      <Typography variant='body2' color={row.email_verified ? 'success.main' : 'error.main'}>
        {row.email_verified ? 'Verified' : 'Not Verified'}
      </Typography>
    )
  },
  {
    field: 'plan_id',
    headerName: 'Plan',
    flex: 0.5,
    minWidth: 80,
    renderCell: ({ row }) => (
      <Typography variant='body2'>{PLAN_NAMES[row.plan_id] ?? `#${row.plan_id}`}</Typography>
    )
  },
  {
    field: 'created_at',
    headerName: 'Created',
    flex: 1,
    minWidth: 120,
    renderCell: ({ row }) => (
      <Typography variant='body2'>
        {fromNow(row.created_at)}
      </Typography>
    )
  }
]
