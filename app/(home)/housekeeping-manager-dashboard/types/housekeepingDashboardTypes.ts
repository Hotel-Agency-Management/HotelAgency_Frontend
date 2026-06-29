export interface KpiResponse {
  activeTickets: { count: number }
  overdueTickets: { count: number }
  highPriorityTickets: { count: number }
  completionRate: { done: number; total: number; rate: number }
}

export interface TicketStatusItem {
  status: string
  count: number
  percentage: number
}

export interface TicketStatusDistributionResponse {
  total: number
  items: TicketStatusItem[]
}

export interface TicketCompletionRateResponse {
  value: number
}

export interface OpenTicketsSeriesItem {
  date: string
  open: number
}

export interface OpenTicketsOverTimeResponse {
  granularity: string
  from: string
  to: string
  series: OpenTicketsSeriesItem[]
}

export interface TicketTypeItem {
  type: string
  count: number
}

export interface TicketTypesResponse {
  total: number
  data: TicketTypeItem[]
}

export interface TicketPriorityItem {
  priority: string
  count: number
}

export interface TicketPrioritiesResponse {
  total: number
  data: TicketPriorityItem[]
}
