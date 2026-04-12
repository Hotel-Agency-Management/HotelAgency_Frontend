export type HousekeepingIssueSeverity = "HIGH" | "MEDIUM" | "LOW";
export type HousekeepingIssueKind = "CRITICAL" | "DELAYED" | "RECLEAN" | "OUT_OF_ORDER";

export interface HousekeepingIssue {
  id: string;
  roomNumber: string;
  severity: HousekeepingIssueSeverity;
  kind: HousekeepingIssueKind;
  issueType: string;
  delayLabel: string;
  assignedTo: string;
}

export interface RecentIssue {
  id: string;
  roomNumber: string;
  issueType: string;
  severity: HousekeepingIssueSeverity;
}

export interface AlertTimelineItem {
  id: string;
  time: string;
  label: string;
  severity: HousekeepingIssueSeverity;
}
