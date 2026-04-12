import { AgencyStatus } from "@/components/auth/types/authType";

export const STATUS_COLOR: Record<AgencyStatus, "success" | "warning" | "error"> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
  InComplete: "warning",
};

export const TABLE_HEADERS = ["Agency", "Status", "Plan", "Registered"];
