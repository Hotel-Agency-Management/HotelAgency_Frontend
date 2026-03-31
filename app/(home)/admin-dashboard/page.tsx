"use client";
import { Box, Grid, Typography, Divider, Stack } from "@mui/material"
import DashboardChartsSection from "./components/DashboardChartsSection"
import { DashboardStatsSection } from "./components/DashboardStatsSection"
import { LatestAgenciesSection } from "./components/LatestAgenciesSection"
import { RecentActivitySection } from "./components/RecentActivitySection"

export default function SuperAdminDashboardPage() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3, maxWidth: 1400, mx: "auto" }}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Platform Dashboard
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {today}
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        <DashboardStatsSection />
        <DashboardChartsSection />
      </Stack>
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={2} mt={4}>
        Agencies & Activity
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 7 }} display="flex">
          <LatestAgenciesSection sx={{ flex: 1 }} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }} display="flex">
          <RecentActivitySection sx={{ flex: 1 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
