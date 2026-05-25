import type { TFunction } from 'i18next'
import type { HousekeepingIssueSeverity } from '../types/issue'

export const STAFF_OPTIONS = ['Ahmad', 'Maya', 'Omar', 'Leen', 'Sara', 'Nour']

export interface IssueAlertSummary {
  critical: number
  delayed: number
  reclean: number
  resolvedToday: number
}

export interface IssueAlertSummaryCard {
  title: string
  value: number
  subtitle: string
}

export function getIssueAlertSummaryCards(summary: IssueAlertSummary, t: TFunction): IssueAlertSummaryCard[] {
  return [
    {
      title: t('housekeeping.issues.summary.criticalIssues', { defaultValue: 'Critical Issues' }),
      value: summary.critical,
      subtitle: t('housekeeping.issues.summary.criticalSubtitle', { defaultValue: 'need supervisor action' })
    },
    {
      title: t('housekeeping.issues.summary.delayedRooms', { defaultValue: 'Delayed Rooms' }),
      value: summary.delayed,
      subtitle: t('housekeeping.issues.summary.delayedSubtitle', { defaultValue: 'behind cleaning target' })
    },
    {
      title: t('housekeeping.issues.summary.recleanRequired', { defaultValue: 'Re-clean Required' }),
      value: summary.reclean,
      subtitle: t('housekeeping.issues.summary.recleanSubtitle', { defaultValue: 'failed inspection today' })
    },
    {
      title: t('housekeeping.issues.summary.resolvedToday', { defaultValue: 'Resolved Today' }),
      value: summary.resolvedToday,
      subtitle: t('housekeeping.issues.summary.resolvedSubtitle', { defaultValue: 'closed by housekeeping' })
    }
  ]
}

export function getSeverityMeta(
  t: TFunction
): Record<HousekeepingIssueSeverity, { label: string; icon: string; palette: 'error' | 'warning' | 'success' }> {
  return {
    HIGH: {
      label: t('housekeeping.issues.severity.HIGH', { defaultValue: 'High' }),
      icon: 'lucide:alert-triangle',
      palette: 'error'
    },
    MEDIUM: {
      label: t('housekeeping.issues.severity.MEDIUM', { defaultValue: 'Medium' }),
      icon: 'lucide:alert-circle',
      palette: 'warning'
    },
    LOW: {
      label: t('housekeeping.issues.severity.LOW', { defaultValue: 'Low' }),
      icon: 'lucide:info',
      palette: 'success'
    }
  }
}

/** @deprecated Use getSeverityMeta(t) for translated labels. */
export const SEVERITY_META: Record<
  HousekeepingIssueSeverity,
  { label: string; icon: string; palette: 'error' | 'warning' | 'success' }
> = {
  HIGH: {
    label: 'High',
    icon: 'lucide:alert-triangle',
    palette: 'error'
  },
  MEDIUM: {
    label: 'Medium',
    icon: 'lucide:alert-circle',
    palette: 'warning'
  },
  LOW: {
    label: 'Low',
    icon: 'lucide:info',
    palette: 'success'
  }
}
