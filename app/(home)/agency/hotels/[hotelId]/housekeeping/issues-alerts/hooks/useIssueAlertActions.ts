"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  AlertTimelineItem,
  HousekeepingIssue,
  HousekeepingIssueSeverity,
  RecentIssue
} from "../types/issue";
import { HOUSEKEEPING_ISSUE_KIND, HOUSEKEEPING_ISSUE_SEVERITY } from "../types/issue";
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
  const { t } = useTranslation();
  const [criticalIssues, setCriticalIssues] = useState(initialCriticalIssues);
  const [timeline, setTimeline] = useState(initialTimeline);
  const [reassigningIssue, setReassigningIssue] = useState<HousekeepingIssue | null>(null);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [resolvedToday, setResolvedToday] = useState(initialResolvedToday);
  const [message, setMessage] = useState("");

  const summary = useMemo<IssueAlertSummary>(
    () => ({
      critical: criticalIssues.filter((issue) => issue.severity === HOUSEKEEPING_ISSUE_SEVERITY.HIGH).length,
      delayed: criticalIssues.filter((issue) => issue.kind === HOUSEKEEPING_ISSUE_KIND.DELAYED).length,
      reclean: criticalIssues.filter((issue) => issue.kind === HOUSEKEEPING_ISSUE_KIND.RECLEAN).length,
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
    addTimelineItem(t("housekeeping.issues.toast.resolved", "Room {{number}} resolved.", { number: issue.roomNumber }), HOUSEKEEPING_ISSUE_SEVERITY.LOW);
    setMessage(t("housekeeping.issues.toast.resolved", "Room {{number}} resolved.", { number: issue.roomNumber }));
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
    addTimelineItem(t("housekeeping.issues.toast.reassigned", "Room {{number}} reassigned to {{staff}}.", { number: reassigningIssue.roomNumber, staff: selectedStaff }), reassigningIssue.severity);
    setMessage(t("housekeeping.issues.toast.reassigned", "Room {{number}} reassigned to {{staff}}.", { number: reassigningIssue.roomNumber, staff: selectedStaff }));
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
