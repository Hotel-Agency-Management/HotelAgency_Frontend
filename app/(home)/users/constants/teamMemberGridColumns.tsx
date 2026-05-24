import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { type GridColDef } from "@mui/x-data-grid";
import { Pencil } from "lucide-react";
import { TFunction } from "i18next";
import {
  getAgencyTeamMemberInitials,
  getAgencyTeamMemberName,
  getRoleLabel,
  type AgencyTeamMember,
} from "../config/teamMemberConfig";
import { MemberAvatar, RoleChip, HotelManagerChip } from "./teamMemberGridColumnStyles";

interface TeamMemberGridColumnsOptions {
  onEditRole: (member: AgencyTeamMember) => void;
  t: TFunction;
}

export const getTeamMemberGridColumns = ({
  onEditRole,
  t,
}: TeamMemberGridColumnsOptions): GridColDef<AgencyTeamMember>[] => [
  {
    field: "name",
    headerName: t('users.table.member', 'Team member'),
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
    headerName: t('users.table.phone', 'Phone'),
    flex: 0.9,
    minWidth: 160,
    renderCell: ({ value }) => (
      <Typography
        variant="body2"
        dir="ltr"
        sx={{ unicodeBidi: "isolate", width: "100%" }}
      >
        {value}
      </Typography>
    ),
  },
  {
    field: "role",
    headerName: t('users.table.role', 'Role'),
    flex: 0.7,
    minWidth: 140,
    renderCell: ({ row }) => (
      <RoleChip size="small" label={getRoleLabel(row.role)} />
    ),
  },
  {
    field: "hotelManager",
    headerName: t('users.table.hotelManager', 'Hotel manager'),
    flex: 0.8,
    minWidth: 150,
    sortable: false,
    renderCell: ({ row }) =>
      row.canBeHotelManager ? (
        <HotelManagerChip size="small" label={t('users.table.available', 'Available')} variant="outlined" />
      ) : (
        <Typography variant="caption" color="text.secondary">
          {t('users.table.notEligible', 'Not eligible')}
        </Typography>
      ),
  },
  {
    field: "actions",
    headerName: t('users.table.actions', 'Actions'),
    width: 96,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <Tooltip title={t('users.table.assignRole', 'Assign role')}>
        <IconButton
          size="small"
          aria-label={t('users.table.assignRoleFor', 'Assign role for {{name}}', { name: getAgencyTeamMemberName(row) })}
          onClick={() => onEditRole(row)}
        >
          <Pencil size={16} />
        </IconButton>
      </Tooltip>
    ),
  },
];
