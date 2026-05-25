"use client";

import DirectionalIcon from "@/components/common/DirectionalIcon";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getSeverityMeta } from "../constants/issueAlerts";
import type { RecentIssue } from "../types/issue";
import Chip from "@mui/material/Chip";

export function RecentIssuesList({ issues }: { issues: RecentIssue[] }) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Paper variant="card">
      <Stack gap={2}>
        <Stack gap={0.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            {t("housekeeping.issues.recentIssues.title", "Recent Issues")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("housekeeping.issues.recentIssues.subtitle", "Fast room-level scan for the latest housekeeping blockers.")}
          </Typography>
        </Stack>

        <Stack divider={<Divider flexItem />}>
          {issues.map((issue) => {
            const meta = getSeverityMeta(t)[issue.severity];
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
                    {t("housekeeping.issues.criticalIssues.roomLabel", "Room {{number}}", { number: issue.roomNumber })}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1} minWidth={0}>
                  <DirectionalIcon
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
