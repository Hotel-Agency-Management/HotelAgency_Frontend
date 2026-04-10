import type { HousekeepingTask } from "../types/task";

export const HOUSEKEEPING_TASKS: HousekeepingTask[] = [
  {
    id: "hk-task-001",
    roomNumber: "101",
    type: "CHECKOUT",
    status: "PENDING",
    assignedTo: "Sara Ahmad",
    priority: "HIGH",
    floor: 1
  },
  {
    id: "hk-task-002",
    roomNumber: "104",
    type: "STAYOVER",
    status: "IN_PROGRESS",
    assignedTo: "Omar Khaled",
    priority: "MEDIUM",
    floor: 1
  },
  {
    id: "hk-task-003",
    roomNumber: "205",
    type: "INSPECTION",
    status: "PENDING",
    assignedTo: "Lina Hassan",
    priority: "LOW",
    floor: 2
  },
  {
    id: "hk-task-004",
    roomNumber: "208",
    type: "CHECKOUT",
    status: "COMPLETED",
    assignedTo: "Noor Ali",
    priority: "HIGH",
    floor: 2
  },
  {
    id: "hk-task-005",
    roomNumber: "301",
    type: "STAYOVER",
    status: "PENDING",
    assignedTo: "Yousef Salem",
    priority: "MEDIUM",
    floor: 3
  },
  {
    id: "hk-task-006",
    roomNumber: "315",
    type: "CHECKOUT",
    status: "IN_PROGRESS",
    assignedTo: "Sara Ahmad",
    priority: "HIGH",
    floor: 3
  },
  {
    id: "hk-task-007",
    roomNumber: "402",
    type: "INSPECTION",
    status: "COMPLETED",
    assignedTo: "Omar Khaled",
    priority: "LOW",
    floor: 4
  },
  {
    id: "hk-task-008",
    roomNumber: "410",
    type: "CHECKOUT",
    status: "PENDING",
    assignedTo: "Lina Hassan",
    priority: "HIGH",
    floor: 4
  },
  {
    id: "hk-task-009",
    roomNumber: "502",
    type: "STAYOVER",
    status: "COMPLETED",
    assignedTo: "Noor Ali",
    priority: "MEDIUM",
    floor: 5
  },
  {
    id: "hk-task-010",
    roomNumber: "509",
    type: "INSPECTION",
    status: "PENDING",
    assignedTo: "Yousef Salem",
    priority: "LOW",
    floor: 5
  }
];
