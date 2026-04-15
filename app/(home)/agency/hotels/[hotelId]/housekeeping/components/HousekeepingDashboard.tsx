"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { ChartCard, DoughnutChart, GaugeChart, HorizontalBarChart, LineChart } from "@/components/charts";
import themeConfig from "@/core/configs/themeConfig";
import { useHousekeepingDashboard } from "../hooks/useHousekeepingDashboard";
import { HousekeepingSummaryCard } from "./HousekeepingSummaryCard";

export function HousekeepingDashboard() {
  const dashboard = useHousekeepingDashboard();
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <Stack gap={themeConfig.common.commonSpacing}>
        <Stack gap={0.75}>
          <Typography variant="h5" fontWeight={700}>
            Housekeeping Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dashboard.hotelName} • {dashboard.dateLabel}
          </Typography>
        </Stack>

        <Grid container spacing={themeConfig.common.commonSpacing} columns={{ xs: 12, lg: 15 }}>
          {dashboard.metricCards.map((card) => (
            <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <HousekeepingSummaryCard
                title={card.title}
                value={card.value}
                change={card.change}
                subtitle={card.subtitle}
                color={card.color}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={themeConfig.common.commonSpacing} columns={{ xs: 12, lg: 12 }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <ChartCard title="Housekeeping Status Overview">
              <DoughnutChart
                data={dashboard.statusOverview}
                colors={dashboard.statusOverviewColors}
                height={300}
                percentage
                legendPosition="bottom"
                legendAlign="center"
              />
            </ChartCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <ChartCard title="Completion Rate">
              <Stack
                gap={1.5}
                alignItems="center"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <GaugeChart
                  value={dashboard.completionRate}
                  valueMax={100}
                  unit="%"
                  colors={[dashboard.gaugeColor]}
                  height={210}
                />
                <Typography variant="body2" color="text.secondary">
                  {dashboard.completedRooms} of {dashboard.totalRooms} rooms completed today
                </Typography>
              </Stack>
            </ChartCard>
          </Grid>
        </Grid>

        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12 }}>
            <ChartCard title="Rooms Cleaned Over Time">
              <LineChart
                labels={dashboard.cleanedOverTime.labels}
                series={[
                  {
                    label: "Rooms Cleaned",
                    data: dashboard.cleanedOverTime.values
                  }
                ]}
                colors={[dashboard.lineColor]}
                showLegend={false}
                height={320}
              />
            </ChartCard>
          </Grid>
        </Grid>

        <Grid container spacing={themeConfig.common.commonSpacing}>
          <Grid size={{ xs: 12 }}>
            <ChartCard title="Average Cleaning Time by Room Type">
              <Grid container spacing={themeConfig.common.commonSpacing} alignItems="stretch">
                <Grid size={{ xs: 12, lg: 8 }}>
                  <Stack gap={2}>
                    <Typography variant="body2" color="text.secondary">
                      Track which room types take longer so delays are easier to spot.
                    </Typography>
                    <HorizontalBarChart
                      data={dashboard.cleaningTimeByRoomType.values}
                      labels={dashboard.cleaningTimeByRoomType.labels}
                      color={dashboard.barColor}
                      height={240}
                      labelWidth={150}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>
                  <Stack gap={1.5} sx={{ height: "100%" }}>
                    {dashboard.cleaningTimeInsights.map((item) => (
                      <Stack
                        key={item.label}
                        gap={0.5}
                        sx={{
                          border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                          borderRadius: themeConfig.common.commonBorderRadius,
                          bgcolor: alpha(dashboard.barColor, 0.08),
                          minHeight: 0,
                          p: 2
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" fontWeight={700}>
                          {item.label}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {item.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.helper}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </ChartCard>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
