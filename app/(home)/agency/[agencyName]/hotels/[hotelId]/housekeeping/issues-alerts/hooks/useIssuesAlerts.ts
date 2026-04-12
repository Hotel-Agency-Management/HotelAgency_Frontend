"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useHotelStore } from "../../../../hooks/useHotelStore";
import {
  CRITICAL_HOUSEKEEPING_ISSUES,
  HOUSEKEEPING_ALERT_TIMELINE,
  RECENT_HOUSEKEEPING_ISSUES
} from "../data/mockIssues";

export function useIssuesAlertsPage() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const hotel = useHotelStore((state) =>
    params.hotelId ? state.getHotelById(params.hotelId) : undefined
  );

  const summary = useMemo(
    () => ({
      critical: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.severity === "HIGH").length,
      delayed: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.kind === "DELAYED").length,
      reclean: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.kind === "RECLEAN").length,
      resolvedToday: 9
    }),
    []
  );

  return {
    theme,
    hotelName: hotel?.basicInfo.name ?? "Selected Hotel",
    primaryColor: hotel?.branding.colors?.primary ?? theme.palette.primary.main,
    summary,
    criticalIssues: CRITICAL_HOUSEKEEPING_ISSUES,
    recentIssues: RECENT_HOUSEKEEPING_ISSUES,
    timeline: HOUSEKEEPING_ALERT_TIMELINE
  };
}
