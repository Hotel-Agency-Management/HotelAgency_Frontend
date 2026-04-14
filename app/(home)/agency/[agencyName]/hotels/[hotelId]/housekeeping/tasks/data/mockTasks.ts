import {
  HOUSEKEEPING_TASK_PRIORITY,
  HOUSEKEEPING_TASK_STATUS,
  HOUSEKEEPING_TASK_TYPE,
  type HousekeepingTask
} from "../types/task";

export const HOUSEKEEPING_TASKS: HousekeepingTask[] = [
  {
    id: "hk-task-001",
    roomNumber: "101",
    type: HOUSEKEEPING_TASK_TYPE.CHECKOUT,
    status: HOUSEKEEPING_TASK_STATUS.PENDING,
    assignedTo: "Sara Ahmad",
    priority: HOUSEKEEPING_TASK_PRIORITY.HIGH,
    floor: 1
  },
  {
    id: "hk-task-002",
    roomNumber: "104",
    type: HOUSEKEEPING_TASK_TYPE.STAYOVER,
    status: HOUSEKEEPING_TASK_STATUS.IN_PROGRESS,
    assignedTo: "Omar Khaled",
    priority: HOUSEKEEPING_TASK_PRIORITY.MEDIUM,
    floor: 1
  },
  {
    id: "hk-task-003",
    roomNumber: "205",
    type: HOUSEKEEPING_TASK_TYPE.INSPECTION,
    status: HOUSEKEEPING_TASK_STATUS.PENDING,
    assignedTo: "Lina Hassan",
    priority: HOUSEKEEPING_TASK_PRIORITY.LOW,
    floor: 2
  },
  {
    id: "hk-task-004",
    roomNumber: "208",
    type: HOUSEKEEPING_TASK_TYPE.CHECKOUT,
    status: HOUSEKEEPING_TASK_STATUS.COMPLETED,
    assignedTo: "Noor Ali",
    priority: HOUSEKEEPING_TASK_PRIORITY.HIGH,
    floor: 2
  },
  {
    id: "hk-task-005",
    roomNumber: "301",
    type: HOUSEKEEPING_TASK_TYPE.STAYOVER,
    status: HOUSEKEEPING_TASK_STATUS.PENDING,
    assignedTo: "Yousef Salem",
    priority: HOUSEKEEPING_TASK_PRIORITY.MEDIUM,
    floor: 3
  },
  {
    id: "hk-task-006",
    roomNumber: "315",
    type: HOUSEKEEPING_TASK_TYPE.CHECKOUT,
    status: HOUSEKEEPING_TASK_STATUS.IN_PROGRESS,
    assignedTo: "Sara Ahmad",
    priority: HOUSEKEEPING_TASK_PRIORITY.HIGH,
    floor: 3
  },
  {
    id: "hk-task-007",
    roomNumber: "402",
    type: HOUSEKEEPING_TASK_TYPE.INSPECTION,
    status: HOUSEKEEPING_TASK_STATUS.COMPLETED,
    assignedTo: "Omar Khaled",
    priority: HOUSEKEEPING_TASK_PRIORITY.LOW,
    floor: 4
  },
  {
    id: "hk-task-008",
    roomNumber: "410",
    type: HOUSEKEEPING_TASK_TYPE.CHECKOUT,
    status: HOUSEKEEPING_TASK_STATUS.PENDING,
    assignedTo: "Lina Hassan",
    priority: HOUSEKEEPING_TASK_PRIORITY.HIGH,
    floor: 4
  },
  {
    id: "hk-task-009",
    roomNumber: "502",
    type: HOUSEKEEPING_TASK_TYPE.STAYOVER,
    status: HOUSEKEEPING_TASK_STATUS.COMPLETED,
    assignedTo: "Noor Ali",
    priority: HOUSEKEEPING_TASK_PRIORITY.MEDIUM,
    floor: 5
  },
  {
    id: "hk-task-010",
    roomNumber: "509",
    type: HOUSEKEEPING_TASK_TYPE.INSPECTION,
    status: HOUSEKEEPING_TASK_STATUS.PENDING,
    assignedTo: "Yousef Salem",
    priority: HOUSEKEEPING_TASK_PRIORITY.LOW,
    floor: 5
  }
];
