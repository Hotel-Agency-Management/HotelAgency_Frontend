import type { GridColDef } from "@mui/x-data-grid";
import {
  createDataGridColumnsFactory,
} from "@/core/utils/dataGridColumns";
import type { HousekeepingTask } from "../../types/task";
import type {
  ColumnStrategyContext,
  HousekeepingTaskColumnKey
} from "./types";
import { COLUMN_STRATEGIES, DEFAULT_COLUMN_ORDER } from "../../constants/columns";

const buildHousekeepingTaskColumns =
  createDataGridColumnsFactory(COLUMN_STRATEGIES);

export function getHousekeepingTaskColumns(
  context: ColumnStrategyContext,
  columnOrder: readonly HousekeepingTaskColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<HousekeepingTask>[] {
  return buildHousekeepingTaskColumns(context, columnOrder);
}
