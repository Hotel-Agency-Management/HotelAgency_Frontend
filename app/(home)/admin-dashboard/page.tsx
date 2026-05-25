"use client";
import { Grid, Typography, Divider, Stack, Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import DashboardChartsSection from "./components/DashboardChartsSection"
import { DashboardStatsSection } from "./components/DashboardStatsSection"
import { LatestAgenciesSection } from "./components/LatestAgenciesSection"
import { RecentActivitySection } from "./components/RecentActivitySection"

export default function SuperAdminDashboardPage() {
  const { t } = useTranslation()

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack spacing={1.5}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {t('dashboard.admin.title', { defaultValue: 'Platform Dashboard' })}
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {today}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        <DashboardStatsSection />
        <DashboardChartsSection />
      </Stack>
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={2} mt={4}>
        {t('dashboard.admin.subtitle', { defaultValue: 'Agencies & Activity' })}
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 7 }} display="flex">
          <LatestAgenciesSection sx={{ flex: 1 }} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }} display="flex">
          <RecentActivitySection sx={{ flex: 1 }} />
        </Grid>
      </Grid>
    </Container>
  );
}
