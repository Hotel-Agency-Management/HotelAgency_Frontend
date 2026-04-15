import { useState } from "react";
import { HOUSEKEEPING_TASKS } from "../data/mockTasks";
import {
  HOUSEKEEPING_TASK_STATUS,
  HousekeepingTaskType,
  HousekeepingTask
} from "../types/task";

type TaskValues = {
  roomNumber: string;
  type: HousekeepingTaskType;
  assignedTo: string;
  priority: HousekeepingTask["priority"];
  floor: number;
};

export function useTaskManager() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(HOUSEKEEPING_TASKS);
  const [editingTask, setEditingTask] = useState<HousekeepingTask | null>(null);
  const [deletingTask, setDeletingTask] = useState<HousekeepingTask | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const createTask = (values: TaskValues) => {
    setTasks((current) => [
      {
        id: `hk-task-${crypto.randomUUID()}`,
        ...values,
        status: HOUSEKEEPING_TASK_STATUS.PENDING
      },
      ...current
    ]);
  };

  const updateTask = (values: TaskValues) => {
    if (!editingTask) return;
    setTasks((current) =>
      current.map((task) =>
        task.id === editingTask.id ? { ...task, ...values } : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = () => {
    if (!deletingTask) return;
    setTasks((current) => current.filter((task) => task.id !== deletingTask.id));
    setDeletingTask(null);
  };

  const handleSave = (values: TaskValues) => {
    editingTask ? updateTask(values) : createTask(values);
  };

  const handleOpenEdit = (task: HousekeepingTask) => {
    setEditingTask(task);
    setIsCreateDialogOpen(true);
  };

  const handleOpenDelete = (task: HousekeepingTask) => {
    setDeletingTask(task);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingTask(null);
  };

  const handleCloseDelete = () => {
    setDeletingTask(null);
  };

  return {
    tasks,
    editingTask,
    deletingTask,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    handleSave,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseDialog,
    handleCloseDelete,
    deleteTask
  };
}
