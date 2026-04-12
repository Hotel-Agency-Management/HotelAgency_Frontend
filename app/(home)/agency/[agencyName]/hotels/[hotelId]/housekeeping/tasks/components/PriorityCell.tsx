import { useTheme } from "@mui/material";
import { PRIORITY_COLOR_KEY } from "../constants/chipColor";
import { PRIORITY_LABELS } from "../constants/taskChip";
import { HousekeepingTaskPriority } from "../types/task";
import { StatusChip } from "./StatusChip";

export function PriorityCell({ value }: { value: HousekeepingTaskPriority }) {
  const theme = useTheme();
  const color = theme.palette[PRIORITY_COLOR_KEY[value]].main;
  return <StatusChip label={PRIORITY_LABELS[value]} color={color} />;
}
