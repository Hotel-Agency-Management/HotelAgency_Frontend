export const HOUSEKEEPING_ISSUE_SEVERITY = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

export const HOUSEKEEPING_ISSUE_KIND = {
  CRITICAL: "CRITICAL",
  DELAYED: "DELAYED",
  RECLEAN: "RECLEAN",
  OUT_OF_ORDER: "OUT_OF_ORDER",
} as const;

export type HousekeepingIssueSeverity =
  (typeof HOUSEKEEPING_ISSUE_SEVERITY)[keyof typeof HOUSEKEEPING_ISSUE_SEVERITY];
export type HousekeepingIssueKind =
  (typeof HOUSEKEEPING_ISSUE_KIND)[keyof typeof HOUSEKEEPING_ISSUE_KIND];

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
