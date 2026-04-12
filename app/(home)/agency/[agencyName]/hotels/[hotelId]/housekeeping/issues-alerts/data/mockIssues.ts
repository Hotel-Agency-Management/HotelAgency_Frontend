import type { AlertTimelineItem, HousekeepingIssue, RecentIssue } from "../types/issue";

export const CRITICAL_HOUSEKEEPING_ISSUES: HousekeepingIssue[] = [
  {
    id: "issue-204",
    roomNumber: "204",
    severity: "HIGH",
    kind: "DELAYED",
    issueType: "Delayed Cleaning",
    delayLabel: "45 min late",
    assignedTo: "Ahmad"
  },
  {
    id: "issue-101",
    roomNumber: "101",
    severity: "HIGH",
    kind: "RECLEAN",
    issueType: "Re-clean Required",
    delayLabel: "Failed inspection",
    assignedTo: "Maya"
  },
  {
    id: "issue-305",
    roomNumber: "305",
    severity: "MEDIUM",
    kind: "DELAYED",
    issueType: "Delayed Cleaning",
    delayLabel: "30 min late",
    assignedTo: "Omar"
  },
  {
    id: "issue-212",
    roomNumber: "212",
    severity: "HIGH",
    kind: "OUT_OF_ORDER",
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
    severity: "HIGH"
  },
  {
    id: "recent-305",
    roomNumber: "305",
    issueType: "Delayed",
    severity: "MEDIUM"
  },
  {
    id: "recent-212",
    roomNumber: "212",
    issueType: "Out of Order",
    severity: "HIGH"
  },
  {
    id: "recent-318",
    roomNumber: "318",
    issueType: "Missing Amenities",
    severity: "LOW"
  }
];

export const HOUSEKEEPING_ALERT_TIMELINE: AlertTimelineItem[] = [
  {
    id: "alert-1030",
    time: "10:30",
    label: "Room 204 delayed",
    severity: "HIGH"
  },
  {
    id: "alert-1010",
    time: "10:10",
    label: "Room 101 failed inspection",
    severity: "HIGH"
  },
  {
    id: "alert-0950",
    time: "09:50",
    label: "Room 305 still dirty",
    severity: "MEDIUM"
  },
  {
    id: "alert-0925",
    time: "09:25",
    label: "Room 318 missing amenities",
    severity: "LOW"
  }
];
