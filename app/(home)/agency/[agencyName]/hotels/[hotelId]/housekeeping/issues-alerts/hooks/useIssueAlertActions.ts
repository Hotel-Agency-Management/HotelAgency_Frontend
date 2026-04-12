"use client";

import { useMemo, useState } from "react";
import type {
  AlertTimelineItem,
  HousekeepingIssue,
  HousekeepingIssueSeverity,
  RecentIssue
} from "../types/issue";
import type { IssueAlertSummary } from "../constants/issueAlerts";
import { getCurrentTimeLabel } from "../utils/time";

interface UseIssueAlertActionsParams {
  initialCriticalIssues: HousekeepingIssue[];
  initialRecentIssues: RecentIssue[];
  initialTimeline: AlertTimelineItem[];
  initialResolvedToday?: number;
}


export function useIssueAlertActions({
  initialCriticalIssues,
  initialRecentIssues,
  initialTimeline,
  initialResolvedToday = 9
}: UseIssueAlertActionsParams) {
  const [criticalIssues, setCriticalIssues] = useState(initialCriticalIssues);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [reassigningIssue, setReassigningIssue] = useState<HousekeepingIssue | null>(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [resolvedToday, setResolvedToday] = useState(initialResolvedToday);
  const [message, setMessage] = useState("");

  const summary = useMemo<IssueAlertSummary>(
    () => ({
      critical: criticalIssues.filter((issue) => issue.severity === "HIGH").length,
      delayed: criticalIssues.filter((issue) => issue.kind === "DELAYED").length,
      reclean: criticalIssues.filter((issue) => issue.kind === "RECLEAN").length,
      resolvedToday
    }),
    [criticalIssues, resolvedToday]
  );

  const activeRecentIssues = useMemo<RecentIssue[]>(
    () => [
      ...criticalIssues.map((issue) => ({
        id: `active-${issue.id}`,
        roomNumber: issue.roomNumber,
        issueType: issue.issueType,
        severity: issue.severity
      })),
      ...initialRecentIssues.filter((recentIssue) =>
        criticalIssues.every((issue) => issue.roomNumber !== recentIssue.roomNumber)
      )
    ].slice(0, 5),
    [criticalIssues, initialRecentIssues]
  );

  const addTimelineItem = (label: string, severity: HousekeepingIssueSeverity) => {
    setTimeline((current) => [
      {
        id: `alert-${Date.now()}`,
        time: getCurrentTimeLabel(),
        label,
        severity
      },
      ...current
    ].slice(0, 6));
  };

  const handleResolve = (issue: HousekeepingIssue) => {
    setCriticalIssues((current) => current.filter((item) => item.id !== issue.id));
    setReassigningIssue((current) => (current?.id === issue.id ? null : current));
    setResolvedToday((current) => current + 1);
    addTimelineItem(`Room ${issue.roomNumber} resolved`, "LOW");
    setMessage(`Room ${issue.roomNumber} resolved.`);
  };

  const handleOpenReassign = (issue: HousekeepingIssue) => {
    setReassigningIssue(issue);
    setSelectedStaff(issue.assignedTo);
  };

  const handleCloseReassign = () => {
    setReassigningIssue(null);
    setSelectedStaff("");
  };

  const handleConfirmReassign = () => {
    if (!reassigningIssue || !selectedStaff) {
      return;
    }

    setCriticalIssues((current) =>
      current.map((item) =>
        item.id === reassigningIssue.id
          ? {
              ...item,
              assignedTo: selectedStaff
            }
          : item
      )
    );
    addTimelineItem(`Room ${reassigningIssue.roomNumber} reassigned to ${selectedStaff}`, reassigningIssue.severity);
    setMessage(`Room ${reassigningIssue.roomNumber} reassigned to ${selectedStaff}.`);
    handleCloseReassign();
  };

  return {
    activeRecentIssues,
    criticalIssues,
    handleCloseMessage: () => setMessage(""),
    handleCloseReassign,
    handleConfirmReassign,
    handleOpenReassign,
    handleResolve,
    message,
    reassigningIssue,
    selectedStaff,
    setSelectedStaff,
    summary,
    timeline
  };
}
