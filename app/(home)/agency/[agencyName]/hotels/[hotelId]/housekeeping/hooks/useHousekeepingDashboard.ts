"use client";

import { useParams } from "next/navigation";
import { alpha, darken, lighten, useTheme } from "@mui/material/styles";
import { useHotelStore } from "../../../hooks/useHotelStore";
import { getHousekeepingDashboardSeed } from "../data/housekeepingDashboard";

function buildHousekeepingPalette(primary: string, secondary: string, tertiary: string, isDarkMode: boolean) {
  return [
    primary,
    secondary,
    tertiary,
    isDarkMode ? lighten(primary, 0.18) : darken(primary, 0.12),
    isDarkMode ? alpha(secondary, 0.88) : darken(secondary, 0.08)
  ];
}

export function useHousekeepingDashboard() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const hotelId = params.hotelId;
  const hotel = useHotelStore((state) => (hotelId ? state.getHotelById(hotelId) : undefined));
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
      { label: "Clean", value: dashboardSeed.statusCounts.clean },
      { label: "Dirty", value: dashboardSeed.statusCounts.dirty },
      { label: "In Progress", value: dashboardSeed.statusCounts.inProgress },
      { label: "Inspected", value: dashboardSeed.statusCounts.inspected }
    ],
    chartColors,
    statusOverviewColors: chartColors.slice(0, 4),
    cleanedOverTime: dashboardSeed.cleanedOverTime,
    cleaningTimeByRoomType: dashboardSeed.cleaningTimeByRoomType,
    cleaningTimeInsights: [
      {
        label: "Slowest Type",
        value: slowestRoomType.label,
        helper: `${slowestRoomType.value} min average`
      },
      {
        label: "Fastest Type",
        value: fastestRoomType.label,
        helper: `${fastestRoomType.value} min average`
      },
      {
        label: "Time Gap",
        value: `${cleaningTimeGap} min`,
        helper: "difference between fastest and slowest"
      }
    ],
    lineColor: chartColors[0],
    gaugeColor: chartColors[1],
    barColor: chartColors[0],
    metricCards: [
      {
        title: "Total Rooms",
        value: totalRooms,
        change: dashboardSeed.metricChanges.totalRooms,
        subtitle: "current inventory",
        color: chartColors[0]
      },
      {
        title: "Clean Rooms",
        value: dashboardSeed.statusCounts.clean,
        change: dashboardSeed.metricChanges.cleanRooms,
        subtitle: "ready for guests",
        color: chartColors[1]
      },
      {
        title: "Dirty Rooms",
        value: dashboardSeed.statusCounts.dirty,
        change: dashboardSeed.metricChanges.dirtyRooms,
        subtitle: "waiting for assignment",
        color: chartColors[2]
      },
      {
        title: "In Progress",
        value: dashboardSeed.statusCounts.inProgress,
        change: dashboardSeed.metricChanges.inProgress,
        subtitle: "currently being cleaned",
        color: chartColors[3]
      },
      {
        title: "Inspected",
        value: dashboardSeed.statusCounts.inspected,
        change: dashboardSeed.metricChanges.inspected,
        subtitle: "approved by supervisor",
        color: chartColors[4]
      }
    ]
  };
}
