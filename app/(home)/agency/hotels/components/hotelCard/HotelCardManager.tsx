"use client";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Mail } from "lucide-react";
import type { AgencyTeamMember } from "@/app/(home)/agency/types/teamMember";
import { getAgencyTeamMemberName, getRoleLabel } from "@/app/(home)/agency/types/teamMember";

interface HotelCardManagerProps {
  manager?: AgencyTeamMember;
  accentColor: string;
}

export function HotelCardManager({ manager, accentColor }: HotelCardManagerProps) {
  const initials = manager
    ? `${manager.firstName[0] ?? ""}${manager.lastName[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <>
      <Divider sx={(theme) => ({ borderColor: alpha(theme.palette.common.white, 0.15) })} />

      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{
            bgcolor: alpha(accentColor, 0.34),
            color: "common.white",
          }}
        >
          {initials}
        </Avatar>

        <Stack spacing={0} minWidth={0} flex={1}>
          <Typography variant="caption" fontWeight={500} color="common.white" noWrap>
            {manager ? getAgencyTeamMemberName(manager) : "Manager unavailable"}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Mail size={9} />
            <Typography
              variant="caption"
              noWrap >
              {manager?.email ?? "This manager is no longer in the team list"}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="caption"
        >
          {manager ? getRoleLabel(manager.role) : "Missing"}
        </Typography>
      </Stack>
    </>
  );
}
