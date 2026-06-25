export interface FinancialSummaryResponse {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  outstandingPayments: number
  refunds: number
  cashBalance: number
}

export interface RevenueExpensesItem {
  month: string
  year: number
  revenue: number
  expenses: number
}

export interface RevenueExpensesResponse {
  data: RevenueExpensesItem[]
}

export interface RevenueByTypeItem {
  paymentType: string
  revenue: number
}

export interface RefundImpactResponse {
  paidRevenue: number
  refundAmount: number
  cancellationLoss: number
}

export interface RevenueGrowthResponse {
  currentRevenue: number
  previousRevenue: number
  growthPercentage: number
  gaugeScore: number
  month: number
  year: number
}

export interface CashFlowItem {
  month: string
  year: number
  incoming: number
  outgoing: number
}

export interface BalanceTrendItem {
  month: string
  year: number
  balance: number
}
