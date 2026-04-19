"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/core/context/AuthContext";
import { useHotelStore } from "../../../../hooks/useHotelStore";
import { useTaskManager } from "./useTaskManager";
import { getTaskSummary } from "../../utils/task";

export function useHousekeepingTasksPage() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const { user } = useAuth();
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined;

  const { hotel } = useHotelStore(
    user?.agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );

  const hotelName = hotel?.basicInfo.name ?? "Selected Hotel";
  const primaryColor = hotel?.branding.colors?.primary ?? theme.palette.primary.main;

  const taskManager = useTaskManager();

  const summary = useMemo(
    () => getTaskSummary(taskManager.tasks),
    [taskManager.tasks]
  );

  return {
    theme,
    hotelName,
    primaryColor,
    summary,
    ...taskManager
  };
}
