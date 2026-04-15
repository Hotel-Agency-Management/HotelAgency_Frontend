"use client";

import { Icon } from "@iconify/react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { SEVERITY_META } from "../constants/issueAlerts";
import type { RecentIssue } from "../types/issue";
import Chip from "@mui/material/Chip";

export function RecentIssuesList({ issues }: { issues: RecentIssue[] }) {
  const theme = useTheme();

  return (
    <Paper variant="card">
      <Stack gap={2}>
        <Stack gap={0.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Recent Issues
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fast room-level scan for the latest housekeeping blockers.
          </Typography>
        </Stack>

        <Stack divider={<Divider flexItem />}>
          {issues.map((issue) => {
            const meta = SEVERITY_META[issue.severity];
            const color = theme.palette[meta.palette].main;

            return (
              <Stack
                key={issue.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Stack direction="row" alignItems="center" gap={1.25} minWidth={0}>
                  <Chip
                    variant="dot"
                    sx={{ color }}
                  />
                  <Typography variant="body2" fontWeight={800} noWrap>
                    Room {issue.roomNumber}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1} minWidth={0}>
                  <Icon
                    icon="lucide:arrow-right"
                    width={14}
                    height={14}
                    style={{ color: theme.palette.text.secondary, flexShrink: 0 }}
                  />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {issue.issueType}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
