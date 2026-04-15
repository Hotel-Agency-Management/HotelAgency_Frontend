import { Palette } from "@mui/material/styles";

interface TaskSummaryConfig {
  color: string;
  icon: string;
}

export function getTaskSummaryConfig(
  title: string,
  palette: Palette,
  overrides?: { color?: string; icon?: string }
): TaskSummaryConfig {
  const defaultConfigs: Record<string, TaskSummaryConfig> = {
    "Total Tasks": { color: palette.primary.main, icon: "lucide:list" },
    "Pending Tasks": { color: palette.warning.main, icon: "lucide:clock" },
    "In Progress": { color: palette.info.main, icon: "lucide:loader" },
    "Completed": { color: palette.success.main, icon: "lucide:check-circle" },
    "Critical Issues": { color: palette.error.main, icon: "lucide:alert-triangle" },
    "Delayed Rooms": { color: palette.warning.main, icon: "lucide:clock" },
    "Re-clean Required": { color: palette.info.main, icon: "lucide:rotate-ccw" },
    "Resolved Today": { color: palette.success.main, icon: "lucide:check-circle" },
  };

  const base = defaultConfigs[title] ?? { color: palette.primary.main, icon: "lucide:list" };

  return {
    color: overrides?.color ?? base.color,
    icon: overrides?.icon ?? base.icon,
  };
}
