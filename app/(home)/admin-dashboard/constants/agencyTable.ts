import { AgencyStatus } from "../types/dashboardTypes";

export const STATUS_COLOR: Record<AgencyStatus, "success" | "warning" | "error"> = {
  Active: "success",
  Pending: "warning",
  Rejected: "error",
};

export const TABLE_HEADERS = ["Agency", "Status", "Plan", "Registered"];
