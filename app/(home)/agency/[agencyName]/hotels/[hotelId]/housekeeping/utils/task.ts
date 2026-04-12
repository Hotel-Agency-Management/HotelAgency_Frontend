import { HousekeepingTask } from "../tasks/types/task";

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(segment => segment[0]?.toUpperCase() ?? "")
    .join("");
}

export function getTaskSummary(tasks: HousekeepingTask[]) {
  return {
    total: tasks.length,
    pending: tasks.filter(task => task.status === "PENDING").length,
    inProgress: tasks.filter(task => task.status === "IN_PROGRESS").length,
    completed: tasks.filter(task => task.status === "COMPLETED").length
  };
}
