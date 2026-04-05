"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { Trash2 } from "lucide-react";
import {
  canAssignAsHotelManager,
  getAgencyTeamMemberInitials,
  getAgencyTeamMemberName,
  getRoleLabel,
  type AgencyTeamMember,
} from "@/app/(home)/agency/types/teamMember";

interface TeamMembersGridProps {
  members: AgencyTeamMember[];
  onDeleteMember: (id: string) => void;
}

export function TeamMembersGrid({
  members,
  onDeleteMember,
}: TeamMembersGridProps) {
  const theme = useTheme()

  const columns: GridColDef<AgencyTeamMember>[] = [
    {
      field: "name",
      headerName: "Team member",
      flex: 1.2,
      minWidth: 240,
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
          <Avatar
            sx={{
              bgcolor: theme => alpha(theme.palette.primary.main, 0.14),
              color: "primary.main",
            }}
          >
            {getAgencyTeamMemberInitials(row)}
          </Avatar>
          <Stack minWidth={0}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {getAgencyTeamMemberName(row)}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {row.email}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.9,
      minWidth: 160,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.7,
      minWidth: 140,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={getRoleLabel(row.role)}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        />
      ),
    },
    {
      field: "hotelManager",
      headerName: "Hotel manager",
      flex: 0.8,
      minWidth: 150,
      sortable: false,
      renderCell: ({ row }) =>
        canAssignAsHotelManager(row.role) ? (
          <Chip size="small" label="Available" variant="outlined" sx={{
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }} />
        ) : (
          <Typography variant="caption" color="text.secondary">
            Not eligible
          </Typography>
        ),
    },
    {
      field: "actions",
      headerName: "",
      width: 88,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "right",
      headerAlign: "right",
      renderCell: ({ row }) => (
        <IconButton
          size="small"
          color="default"
          onClick={() => onDeleteMember(row.id)}
        >
          <Trash2 size={16} />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>

      <DataGrid
        autoHeight
        rows={members}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        rowHeight={74}
      />
    </Paper>
  );
}
