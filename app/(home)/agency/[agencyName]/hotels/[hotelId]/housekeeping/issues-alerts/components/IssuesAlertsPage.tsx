"use client";

import { Icon } from "@iconify/react";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FadeIn from "@/components/animation/FadeIn";
import themeConfig from "@/core/configs/themeConfig";
import { TaskSummaryCard } from "../../tasks/components/TaskSummaryCard";
import { getIssueAlertSummaryCards } from "../constants/issueAlerts";
import { useIssueAlertActions } from "../hooks/useIssueAlertActions";
import { useIssuesAlertsPage } from "../hooks/useIssuesAlerts";
import { AlertsTimeline } from "./AlertsTimeline";
import { CriticalIssueCard } from "./CriticalIssueCard";
import { ReassignDialog } from "./ReassignDialog";
import { RecentIssuesList } from "./RecentIssuesList";

export function IssuesAlertsPage() {
  const {
    hotelName,
    primaryColor,
    criticalIssues: initialCriticalIssues,
    recentIssues,
    timeline: initialTimeline
  } = useIssuesAlertsPage();
  const {
    activeRecentIssues,
    criticalIssues,
    handleCloseMessage,
    handleCloseReassign,
    handleConfirmReassign,
    handleOpenReassign,
    handleResolve,
    message,
    reassigningIssue,
    selectedStaff,
    setSelectedStaff,
    summary,
    timeline
  } = useIssueAlertActions({
    initialCriticalIssues,
    initialRecentIssues: recentIssues,
    initialTimeline
  });

  return (
    <Container maxWidth="xl">
      <Stack gap={themeConfig.common.commonSpacing}>
        <FadeIn direction="down" distance={12}>
          <Stack gap={0.75}>
            <Typography variant="h5" fontWeight={700}>
              Issues & Alerts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hotelName}
            </Typography>
          </Stack>
        </FadeIn>

        <Grid container spacing={themeConfig.common.commonSpacing}>
          {getIssueAlertSummaryCards(summary).map((card, index) => (
            <Grid key={card.title} size={{ xs: 12, sm: 6, xl: 3 }}>
              <FadeIn
                direction="up"
                distance={14}
                transition={{ delay: 0.06 * index, duration: 0.35 }}
                sx={{ height: "100%" }}
              >
                <TaskSummaryCard title={card.title} value={card.value} subtitle={card.subtitle} />
              </FadeIn>
            </Grid>
          ))}
        </Grid>

        <Stack gap={2}>
          <FadeIn direction="up" distance={12} transition={{ delay: 0.12, duration: 0.35 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "center" }}
              justifyContent="space-between"
              gap={1.5}
            >
              <Stack gap={0.5}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Critical Issues
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rooms that need immediate action before guest handoff.
                </Typography>
              </Stack>

              <Chip
                size="small"
                variant="live-alert"
                icon={<Icon icon="lucide:activity" width={14} height={14} />}
                label="Live alerts"
              />
            </Stack>
          </FadeIn>

          <Grid container spacing={themeConfig.common.commonSpacing}>
            {criticalIssues.map((issue, index) => (
              <Grid key={issue.id} size={{ xs: 12, md: 6, xl: 3 }}>
                <FadeIn
                  direction="up"
                  distance={16}
                  transition={{ delay: 0.08 * index, duration: 0.35 }}
                  sx={{ height: "100%" }}
                >
                  <CriticalIssueCard
                    issue={issue}
                    primaryColor={primaryColor}
                    onResolve={handleResolve}
                    onReassign={handleOpenReassign}
                  />
                </FadeIn>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Stack gap={2}>
          <FadeIn direction="up" distance={12} transition={{ delay: 0.12, duration: 0.35 }}>
            <Stack gap={0.5}>
              <Typography variant="subtitle1" fontWeight={700}>
                Activity Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Recent room issues and the live alert timeline.
              </Typography>
            </Stack>
          </FadeIn>

          <Grid container spacing={themeConfig.common.commonSpacing}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FadeIn direction="right" distance={16} transition={{ delay: 0.08, duration: 0.35 }} sx={{ height: "100%" }}>
                <RecentIssuesList issues={activeRecentIssues} />
              </FadeIn>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FadeIn direction="left" distance={16} transition={{ delay: 0.14, duration: 0.35 }} sx={{ height: "100%" }}>
                <AlertsTimeline items={timeline} />
              </FadeIn>
            </Grid>
          </Grid>
        </Stack>

        <ReassignDialog
          issue={reassigningIssue}
          selectedStaff={selectedStaff}
          onClose={handleCloseReassign}
          onStaffChange={setSelectedStaff}
          onConfirm={handleConfirmReassign}
        />

        <Snackbar
          open={Boolean(message)}
          autoHideDuration={2600}
          onClose={handleCloseMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert variant="filled" severity="success" onClose={handleCloseMessage}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
}
