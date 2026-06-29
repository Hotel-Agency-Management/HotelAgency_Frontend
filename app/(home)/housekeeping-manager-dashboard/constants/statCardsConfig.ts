export interface StatCardConfig {
  key: 'activeTickets' | 'overdueTickets' | 'highPriorityTickets' | 'completionRate'
  translationKey: string
  defaultTitle: string
  iconName: string
  color: 'primary' | 'success' | 'warning' | 'error' | 'info'
}

export const STAT_CARDS_CONFIG: StatCardConfig[] = [
  {
    key: 'activeTickets',
    translationKey: 'dashboard.housekeepingManager.stats.activeTickets.title',
    defaultTitle: 'Active Tickets',
    iconName: 'tabler:ticket',
    color: 'info',
  },
  {
    key: 'overdueTickets',
    translationKey: 'dashboard.housekeepingManager.stats.overdueTickets.title',
    defaultTitle: 'Overdue Tickets',
    iconName: 'tabler:clock-exclamation',
    color: 'error',
  },
  {
    key: 'highPriorityTickets',
    translationKey: 'dashboard.housekeepingManager.stats.highPriorityTickets.title',
    defaultTitle: 'High Priority Tickets',
    iconName: 'tabler:alert-triangle',
    color: 'warning',
  },
  {
    key: 'completionRate',
    translationKey: 'dashboard.housekeepingManager.stats.completionRate.title',
    defaultTitle: 'Completion Rate',
    iconName: 'tabler:circle-check',
    color: 'success',
  },
]
