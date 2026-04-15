import type { HousekeepingIssueSeverity } from "../types/issue";

export const STAFF_OPTIONS = ["Ahmad", "Maya", "Omar", "Leen", "Sara", "Nour"];

export interface IssueAlertSummary {
  critical: number;
  delayed: number;
  reclean: number;
  resolvedToday: number;
}

export interface IssueAlertSummaryCard {
  title: string;
  value: number;
  subtitle: string;
}

export function getIssueAlertSummaryCards(summary: IssueAlertSummary): IssueAlertSummaryCard[] {
  return [
    {
      title: "Critical Issues",
      value: summary.critical,
      subtitle: "need supervisor action"
    },
    {
      title: "Delayed Rooms",
      value: summary.delayed,
      subtitle: "behind cleaning target"
    },
    {
      title: "Re-clean Required",
      value: summary.reclean,
      subtitle: "failed inspection today"
    },
    {
      title: "Resolved Today",
      value: summary.resolvedToday,
      subtitle: "closed by housekeeping"
    }
  ];
}

export const SEVERITY_META: Record<
  HousekeepingIssueSeverity,
  { label: string; icon: string; palette: "error" | "warning" | "success" }
> = {
  HIGH: {
    label: "High",
    icon: "lucide:alert-triangle",
    palette: "error"
  },
  MEDIUM: {
    label: "Medium",
    icon: "lucide:alert-circle",
    palette: "warning"
  },
  LOW: {
    label: "Low",
    icon: "lucide:info",
    palette: "success"
  }
};
