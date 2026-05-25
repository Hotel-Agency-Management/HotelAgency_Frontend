"use client";

import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useGetHotelById } from "../../../hooks/queries/useHotelQueries";
import { getHousekeepingDashboardSeed } from "../data/housekeepingDashboard";
import { buildHousekeepingPalette } from "../utils/housekeepingPalette";

export function useHousekeepingDashboard() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const { t } = useTranslation();
  const hotelId = params.hotelId;
  const numericHotelId = hotelId ? Number(hotelId) : undefined;
  const { data: hotel } = useGetHotelById(
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );
  const dashboardSeed = getHousekeepingDashboardSeed(hotelId);

  const totalRooms =
    dashboardSeed.statusCounts.clean +
    dashboardSeed.statusCounts.dirty +
    dashboardSeed.statusCounts.inProgress +
    dashboardSeed.statusCounts.inspected;
  const completedRooms = dashboardSeed.statusCounts.clean + dashboardSeed.statusCounts.inspected;
  const completionRate = totalRooms === 0 ? 0 : Math.round((completedRooms / totalRooms) * 100);
  const hotelName = hotel?.basicInfo.name ?? "Selected Hotel";
  const hotelBranding = hotel?.branding.colors;
  const chartColors = buildHousekeepingPalette(
    hotelBranding?.primary ?? theme.palette.primary.main,
    hotelBranding?.secondary ?? theme.palette.secondary.main,
    hotelBranding?.tertiary ?? theme.palette.info.main,
    theme.palette.mode === "dark"
  );
  const cleaningTimePairs = dashboardSeed.cleaningTimeByRoomType.labels.map((label, index) => ({
    label,
    value: dashboardSeed.cleaningTimeByRoomType.values[index] ?? 0
  }));
  const slowestRoomType = cleaningTimePairs.reduce((slowest, current) =>
    current.value > slowest.value ? current : slowest
  );
  const fastestRoomType = cleaningTimePairs.reduce((fastest, current) =>
    current.value < fastest.value ? current : fastest
  );
  const cleaningTimeGap = slowestRoomType.value - fastestRoomType.value;

  return {
    hotelName,
    dateLabel: new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    totalRooms,
    completedRooms,
    completionRate,
    statusOverview: [
      { label: t("housekeeping.dashboard.status.clean", "Clean"), value: dashboardSeed.statusCounts.clean },
      { label: t("housekeeping.dashboard.status.dirty", "Dirty"), value: dashboardSeed.statusCounts.dirty },
      { label: t("housekeeping.dashboard.status.inProgress", "In Progress"), value: dashboardSeed.statusCounts.inProgress },
      { label: t("housekeeping.dashboard.status.inspected", "Inspected"), value: dashboardSeed.statusCounts.inspected }
    ],
    chartColors,
    statusOverviewColors: chartColors.slice(0, 4),
    cleanedOverTime: dashboardSeed.cleanedOverTime,
    cleaningTimeByRoomType: dashboardSeed.cleaningTimeByRoomType,
    cleaningTimeInsights: [
      {
        label: t("housekeeping.dashboard.insights.slowestType", "Slowest Type"),
        value: slowestRoomType.label,
        helper: t("housekeeping.dashboard.insights.minAverage", "{{value}} min average", { value: slowestRoomType.value })
      },
      {
        label: t("housekeeping.dashboard.insights.fastestType", "Fastest Type"),
        value: fastestRoomType.label,
        helper: t("housekeeping.dashboard.insights.minAverage", "{{value}} min average", { value: fastestRoomType.value })
      },
      {
        label: t("housekeeping.dashboard.insights.timeGap", "Time Gap"),
        value: `${cleaningTimeGap} min`,
        helper: t("housekeeping.dashboard.insights.gapHelper", "difference between fastest and slowest")
      }
    ],
    lineColor: chartColors[0],
    gaugeColor: chartColors[1],
    barColor: chartColors[0],
    metricCards: [
      {
        title: t("housekeeping.dashboard.metrics.totalRooms", "Total Rooms"),
        value: totalRooms,
        change: dashboardSeed.metricChanges.totalRooms,
        subtitle: t("housekeeping.dashboard.metrics.currentInventory", "current inventory"),
        color: chartColors[0]
      },
      {
        title: t("housekeeping.dashboard.metrics.cleanRooms", "Clean Rooms"),
        value: dashboardSeed.statusCounts.clean,
        change: dashboardSeed.metricChanges.cleanRooms,
        subtitle: t("housekeeping.dashboard.metrics.readyForGuests", "ready for guests"),
        color: chartColors[1]
      },
      {
        title: t("housekeeping.dashboard.metrics.dirtyRooms", "Dirty Rooms"),
        value: dashboardSeed.statusCounts.dirty,
        change: dashboardSeed.metricChanges.dirtyRooms,
        subtitle: t("housekeeping.dashboard.metrics.waitingAssignment", "waiting for assignment"),
        color: chartColors[2]
      },
      {
        title: t("housekeeping.dashboard.metrics.inProgress", "In Progress"),
        value: dashboardSeed.statusCounts.inProgress,
        change: dashboardSeed.metricChanges.inProgress,
        subtitle: t("housekeeping.dashboard.metrics.currentlyCleaned", "currently being cleaned"),
        color: chartColors[3]
      },
      {
        title: t("housekeeping.dashboard.metrics.inspected", "Inspected"),
        value: dashboardSeed.statusCounts.inspected,
        change: dashboardSeed.metricChanges.inspected,
        subtitle: t("housekeeping.dashboard.metrics.approvedBySupervisor", "approved by supervisor"),
        color: chartColors[4]
      }
    ]
  };
}
