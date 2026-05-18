"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useGetHotelById } from "../../../../hooks/queries/useHotelQueries";
import { useTaskManager } from "./useTaskManager";
import { getTaskSummary } from "../../utils/task";

export function useHousekeepingTasksPage() {
  const params = useParams<{ hotelId?: string }>();
  const theme = useTheme();
  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined;

  const { data: hotel } = useGetHotelById(
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
    hotelId: params.hotelId ?? '',
    primaryColor,
    summary,
    ...taskManager
  };
}
