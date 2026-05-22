import type { BoardColumn } from "../types/board";

export const BOARD_COLUMNS: BoardColumn[] = [
  { id: "TO_DO", label: "To Do", colorKey: "secondary" },
  { id: "IN_PROGRESS", label: "In Progress", colorKey: "info" },
  { id: "REVIEW", label: "Review", colorKey: "warning" },
  { id: "DONE", label: "Done", colorKey: "success" },
];

export const DROP_ANIMATION = {
  duration: 180,
  easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
};