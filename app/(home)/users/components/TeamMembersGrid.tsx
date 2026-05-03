"use client";

import { DataGrid } from "@mui/x-data-grid";
import { getTeamMemberGridColumns } from "../constants/teamMemberGridColumns";
import type { AgencyTeamMember } from "../config/teamMemberConfig";

interface TeamMembersGridProps {
  members: AgencyTeamMember[];
  onEditRole: (member: AgencyTeamMember) => void;
}

export function TeamMembersGrid({ members, onEditRole }: TeamMembersGridProps) {
  const columns = getTeamMemberGridColumns({ onEditRole });

  return (
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
  );
}
