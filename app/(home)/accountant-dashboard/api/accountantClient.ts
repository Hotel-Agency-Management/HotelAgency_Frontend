import apiClient from '@/core/clients/apiClient'
import {
  BalanceTrendItem,
  CashFlowItem,
  FinancialSummaryResponse,
  RefundImpactResponse,
  RevenueByTypeItem,
  RevenueExpensesResponse,
  RevenueGrowthResponse,
} from '../types/accountantDashboardTypes'

export async function getFinancialSummary(hotelId: number): Promise<FinancialSummaryResponse> {
  const response = await apiClient.get<FinancialSummaryResponse>(`/hotels/${hotelId}/financial-summary`)
  return response.data
}

export async function getRevenueExpenses(hotelId: number): Promise<RevenueExpensesResponse> {
  const response = await apiClient.get<RevenueExpensesResponse>(`/hotels/${hotelId}/revenue-expenses`)
  return response.data
}

export async function getRevenueByType(hotelId: number): Promise<RevenueByTypeItem[]> {
  const response = await apiClient.get<RevenueByTypeItem[]>(`/hotels/${hotelId}/revenue-by-type`)
  return response.data
}

export async function getRefundImpact(hotelId: number): Promise<RefundImpactResponse> {
  const response = await apiClient.get<RefundImpactResponse>(`/hotels/${hotelId}/refund-impact`)
  return response.data
}

export async function getRevenueGrowth(hotelId: number): Promise<RevenueGrowthResponse> {
  const response = await apiClient.get<RevenueGrowthResponse>(`/hotels/${hotelId}/revenue-growth`)
  return response.data
}

export async function getCashFlow(hotelId: number): Promise<CashFlowItem[]> {
  const response = await apiClient.get<CashFlowItem[]>(`/hotels/${hotelId}/cash-flow`)
  return response.data
}

export async function getBalanceTrend(hotelId: number): Promise<BalanceTrendItem[]> {
  const response = await apiClient.get<BalanceTrendItem[]>(`/hotels/${hotelId}/balance-trend`)
  return response.data
}
