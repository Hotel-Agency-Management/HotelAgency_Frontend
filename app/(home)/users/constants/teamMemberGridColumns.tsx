import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { type GridColDef } from "@mui/x-data-grid";
import { Pencil } from "lucide-react";
import {
  getAgencyTeamMemberInitials,
  getAgencyTeamMemberName,
  getRoleLabel,
  type AgencyTeamMember,
} from "../config/teamMemberConfig";
import { MemberAvatar, RoleChip, HotelManagerChip } from "./teamMemberGridColumnStyles";

interface TeamMemberGridColumnsOptions {
  onEditRole: (member: AgencyTeamMember) => void;
}

export const getTeamMemberGridColumns = ({
  onEditRole,
}: TeamMemberGridColumnsOptions): GridColDef<AgencyTeamMember>[] => [
  {
    field: "name",
    headerName: "Team member",
    flex: 1.2,
    minWidth: 240,
    sortable: false,
    renderCell: ({ row }) => (
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{ minWidth: 0 }}
      >
        <MemberAvatar>{getAgencyTeamMemberInitials(row)}</MemberAvatar>
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
    field: "phoneNumber",
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
      <RoleChip size="small" label={getRoleLabel(row.role)} />
    ),
  },
  {
    field: "hotelManager",
    headerName: "Hotel manager",
    flex: 0.8,
    minWidth: 150,
    sortable: false,
    renderCell: ({ row }) =>
      row.canBeHotelManager ? (
        <HotelManagerChip size="small" label="Available" variant="outlined" />
      ) : (
        <Typography variant="caption" color="text.secondary">
          Not eligible
        </Typography>
      ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 96,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <Tooltip title="Assign role">
        <IconButton
          size="small"
          aria-label={`Assign role for ${getAgencyTeamMemberName(row)}`}
          onClick={() => onEditRole(row)}
        >
          <Pencil size={16} />
        </IconButton>
      </Tooltip>
    ),
  },
];
