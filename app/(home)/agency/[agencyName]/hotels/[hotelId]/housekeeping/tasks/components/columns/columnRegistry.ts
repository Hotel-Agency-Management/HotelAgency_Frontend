import type { GridColDef } from "@mui/x-data-grid";
import { actionsColumnStrategy } from "./definitions/actionsColumn";
import { assignedColumnStrategy } from "./definitions/assignedColumn";
import { floorColumnStrategy } from "./definitions/floorColumn";
import { priorityColumnStrategy } from "./definitions/priorityColumn";
import { roomColumnStrategy } from "./definitions/roomColumn";
import { statusColumnStrategy } from "./definitions/statusColumn";
import { typeColumnStrategy } from "./definitions/typeColumn";
import type { HousekeepingTask } from "../../types/task";
import type {
  ColumnStrategyContext,
  HousekeepingColumnStrategy,
  HousekeepingTaskColumnKey
} from "./types";
import { DEFAULT_COLUMN_ORDER } from "../../constants/columns";

const COLUMN_STRATEGIES: HousekeepingColumnStrategy[] = [
  roomColumnStrategy,
  typeColumnStrategy,
  statusColumnStrategy,
  assignedColumnStrategy,
  priorityColumnStrategy,
  floorColumnStrategy,
  actionsColumnStrategy
];


export function getHousekeepingTaskColumns(
  context: ColumnStrategyContext,
  columnOrder: HousekeepingTaskColumnKey[] = DEFAULT_COLUMN_ORDER
): GridColDef<HousekeepingTask>[] {
  const strategyMap = new Map(
    COLUMN_STRATEGIES.map((strategy) => [strategy.key, strategy] as const)
  );

  return columnOrder
    .map((key) => strategyMap.get(key))
    .filter((strategy): strategy is HousekeepingColumnStrategy => Boolean(strategy))
    .map((strategy) => strategy.build(context));
}
