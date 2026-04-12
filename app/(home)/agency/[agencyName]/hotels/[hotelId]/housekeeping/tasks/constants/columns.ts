import { DataGridColumnRegistry } from "@/core/utils/dataGridColumns";
import { createActionsColumn } from "../components/columns/definitions/actionsColumn";
import { createAssignedColumn } from "../components/columns/definitions/assignedColumn";
import { floorColumn } from "../components/columns/definitions/floorColumn";
import { priorityColumn } from "../components/columns/definitions/priorityColumn";
import { roomColumn } from "../components/columns/definitions/roomColumn";
import { statusColumn } from "../components/columns/definitions/statusColumn";
import { typeColumn } from "../components/columns/definitions/typeColumn";
import { ColumnStrategyContext, HousekeepingTaskColumnKey } from "../components/columns/types";
import { HousekeepingTask } from "../types/task";

export const DEFAULT_COLUMN_ORDER: HousekeepingTaskColumnKey[] = [
  "room",
  "type",
  "status",
  "assigned",
  "priority",
  "floor",
  "actions"
];

export const COLUMN_STRATEGIES = {
  room: roomColumn,
  type: typeColumn,
  status: statusColumn,
  assigned: createAssignedColumn,
  priority: priorityColumn,
  floor: floorColumn,
  actions: createActionsColumn
} satisfies DataGridColumnRegistry<
  HousekeepingTaskColumnKey,
  HousekeepingTask,
  ColumnStrategyContext
>;
