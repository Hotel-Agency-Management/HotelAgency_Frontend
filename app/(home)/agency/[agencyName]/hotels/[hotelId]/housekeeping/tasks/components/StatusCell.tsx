import { useTheme } from "@mui/material";
import { STATUS_COLOR_KEY } from "../constants/chipColor";
import { STATUS_LABELS } from "../constants/taskChip";
import { HousekeepingTaskStatus } from "../types/task";
import { StatusChip } from "./StatusChip";

export function StatusCell({ value }: { value: HousekeepingTaskStatus }) {
  const theme = useTheme();
  const color = theme.palette[STATUS_COLOR_KEY[value]].main;
  return <StatusChip label={STATUS_LABELS[value]} color={color} />;
}
