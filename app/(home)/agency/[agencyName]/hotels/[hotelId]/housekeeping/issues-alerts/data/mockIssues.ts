import {
  HOUSEKEEPING_ISSUE_KIND,
  HOUSEKEEPING_ISSUE_SEVERITY,
  type AlertTimelineItem,
  type HousekeepingIssue,
  type RecentIssue
} from "../types/issue";

export const CRITICAL_HOUSEKEEPING_ISSUES: HousekeepingIssue[] = [
  {
    id: "issue-204",
    roomNumber: "204",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH,
    kind: HOUSEKEEPING_ISSUE_KIND.DELAYED,
    issueType: "Delayed Cleaning",
    delayLabel: "45 min late",
    assignedTo: "Ahmad"
  },
  {
    id: "issue-101",
    roomNumber: "101",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH,
    kind: HOUSEKEEPING_ISSUE_KIND.RECLEAN,
    issueType: "Re-clean Required",
    delayLabel: "Failed inspection",
    assignedTo: "Maya"
  },
  {
    id: "issue-305",
    roomNumber: "305",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.MEDIUM,
    kind: HOUSEKEEPING_ISSUE_KIND.DELAYED,
    issueType: "Delayed Cleaning",
    delayLabel: "30 min late",
    assignedTo: "Omar"
  },
  {
    id: "issue-212",
    roomNumber: "212",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH,
    kind: HOUSEKEEPING_ISSUE_KIND.OUT_OF_ORDER,
    issueType: "Out of Order",
    delayLabel: "Maintenance hold",
    assignedTo: "Leen"
  }
];

export const RECENT_HOUSEKEEPING_ISSUES: RecentIssue[] = [
  {
    id: "recent-101",
    roomNumber: "101",
    issueType: "Re-clean Required",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH
  },
  {
    id: "recent-305",
    roomNumber: "305",
    issueType: "Delayed",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.MEDIUM
  },
  {
    id: "recent-212",
    roomNumber: "212",
    issueType: "Out of Order",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH
  },
  {
    id: "recent-318",
    roomNumber: "318",
    issueType: "Missing Amenities",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.LOW
  }
];

export const HOUSEKEEPING_ALERT_TIMELINE: AlertTimelineItem[] = [
  {
    id: "alert-1030",
    time: "10:30",
    label: "Room 204 delayed",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH
  },
  {
    id: "alert-1010",
    time: "10:10",
    label: "Room 101 failed inspection",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.HIGH
  },
  {
    id: "alert-0950",
    time: "09:50",
    label: "Room 305 still dirty",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.MEDIUM
  },
  {
    id: "alert-0925",
    time: "09:25",
    label: "Room 318 missing amenities",
    severity: HOUSEKEEPING_ISSUE_SEVERITY.LOW
  }
];
