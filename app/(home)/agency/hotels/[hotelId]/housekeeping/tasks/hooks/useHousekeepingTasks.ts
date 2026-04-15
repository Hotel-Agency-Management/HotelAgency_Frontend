"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useHotelStore } from "../../../../hooks/useHotelStore";
import { useTaskManager } from "./useTaskManager";
import { getTaskSummary } from "../../utils/task";

export function useHousekeepingTasksPage() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();

  const hotel = useHotelStore(state =>
    params.hotelId ? state.getHotelById(params.hotelId) : undefined
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
