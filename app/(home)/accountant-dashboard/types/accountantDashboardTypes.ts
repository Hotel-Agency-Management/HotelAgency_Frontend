export type AlertSeverity = 'error' | 'warning' | 'info' | 'success'

export interface FinancialAlert {
  id: string
  severity: AlertSeverity
  title: string
  description: string
  amount?: number
  timestamp: string
  icon: string
}

export interface StatCardConfig {
  title: string
  value: string
  subtitle?: string
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' }
  iconName: string
  color: 'primary' | 'success' | 'warning' | 'error' | 'info'
}
export type View = 'daily' | 'weekly' | 'monthly'
