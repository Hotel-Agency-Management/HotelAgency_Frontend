"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/core/context/AuthContext";
import { useHotelStore } from "../../../../hooks/useHotelStore";
import {
  CRITICAL_HOUSEKEEPING_ISSUES,
  HOUSEKEEPING_ALERT_TIMELINE,
  RECENT_HOUSEKEEPING_ISSUES
} from "../data/mockIssues";
import { HOUSEKEEPING_ISSUE_KIND, HOUSEKEEPING_ISSUE_SEVERITY } from "../types/issue";

export function useIssuesAlertsPage() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const { user } = useAuth();
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined;
  const { hotel } = useHotelStore(
    user?.agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );

  const summary = useMemo(
    () => ({
      critical: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.severity === HOUSEKEEPING_ISSUE_SEVERITY.HIGH).length,
      delayed: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.kind === HOUSEKEEPING_ISSUE_KIND.DELAYED).length,
      reclean: CRITICAL_HOUSEKEEPING_ISSUES.filter((issue) => issue.kind === HOUSEKEEPING_ISSUE_KIND.RECLEAN).length,
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
