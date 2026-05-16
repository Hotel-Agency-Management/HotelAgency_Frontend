import { Palette } from "@mui/material/styles";

interface TicketSummaryConfig {
  color: string;
  icon: string;
}

export function getTicketSummaryConfig(
  title: string,
  palette: Palette,
  overrides?: { color?: string; icon?: string }
): TicketSummaryConfig {
  const defaultConfigs: Record<string, TicketSummaryConfig> = {
    "Total Tickets": { color: palette.primary.main, icon: "lucide:list" },
    "Pending Tickets": { color: palette.warning.main, icon: "lucide:clock" },
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
