import type { Theme } from "@mui/material/styles";
import type { HousekeepingTask } from "../../types/task";

export type HousekeepingTaskColumnKey =
  | "room"
  | "type"
  | "status"
  | "assigned"
  | "priority"
  | "floor"
  | "actions";

export interface ColumnStrategyContext {
  primaryColor: string;
  theme: Theme;
  onEdit: (task: HousekeepingTask) => void;
  onDelete: (task: HousekeepingTask) => void;
  onReportDamage?: (task: HousekeepingTask) => void;
}
