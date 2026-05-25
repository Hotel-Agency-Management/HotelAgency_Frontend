"use client";

import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { HousekeepingIssue } from "../types/issue";
import { SeverityChip } from "./SeverityChip";
import { CheckCircle, UserCog } from "lucide-react";

interface CriticalIssueCardProps {
  issue: HousekeepingIssue;
  primaryColor: string;
  onResolve: (issue: HousekeepingIssue) => void;
  onReassign: (issue: HousekeepingIssue) => void;
}

export function CriticalIssueCard({
  issue,
  onResolve,
  onReassign
}: CriticalIssueCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1.5}>
          <Typography variant="h6" fontWeight={800}>
            {t("housekeeping.issues.criticalIssues.roomLabel", "Room {{number}}", { number: issue.roomNumber })}
          </Typography>
          <SeverityChip severity={issue.severity} />
        </Stack>

        <Stack gap={0.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            {issue.issueType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {issue.delayLabel}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon="lucide:user"
            width={16}
            height={16}
            style={{ color: theme.palette.text.secondary }}
          />
          <Typography variant="body2" color="text.secondary">
            {t("housekeeping.issues.criticalIssues.assigned", "Assigned:")}{" "}
            <Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
              {issue.assignedTo}
            </Box>
          </Typography>
        </Stack>

        <Stack direction="row" gap={1} justifyContent='flex-end'>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CheckCircle size={16} />}
            onClick={() => onResolve(issue)}
            color="success"
          >
            {t("housekeeping.issues.criticalIssues.resolve", "Resolve")}
          </Button>

          <Button
            variant="contained"
            size="small"
            disableElevation
            startIcon={<UserCog size={16} />}
            onClick={() => onReassign(issue)}
          >
            {t("housekeeping.issues.criticalIssues.reassign", "Reassign")}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
