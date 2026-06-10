import apiClient from "@/core/clients/apiClient"
import { BookingSourcesResponse, BookingStatusDistributionResponse, OverviewStatsResponse, ProfitExpenseResponse, RevenueByHotelResponse, RevenueTrendsResponse, RoomTypeStatsResponse } from "../config/statisticConfig"

export async function getOverviewStats(agencyId: number) : Promise<OverviewStatsResponse> {
  const response = await apiClient.get<OverviewStatsResponse>(`/agencies/${agencyId}/overview`)
  return response.data
}

export async function getRevenueTrends(agencyId: number) : Promise<RevenueTrendsResponse> {
  const response = await apiClient.get<RevenueTrendsResponse>(`/agencies/${agencyId}/overview/revenue-trend`)
  return response.data
}

export async function getProfitAndExpenseTrends(agencyId: number) : Promise<ProfitExpenseResponse> {
  const response = await apiClient.get<ProfitExpenseResponse>(`/agencies/${agencyId}/overview/profit-expenses`)
  return response.data
}

export async function getBookingDistribution(agencyId: number) : Promise<BookingSourcesResponse> {
  const response = await apiClient.get<BookingSourcesResponse>(`/agencies/${agencyId}/overview/booking-distribution`)
  return response.data
}

export async function getRevenuePerHotel(agencyId: number) : Promise<RevenueByHotelResponse> {
  const response = await apiClient.get<RevenueByHotelResponse>(`/agencies/${agencyId}/overview/revenue-per-hotel`)
  return response.data
}

export async function getStatusDistribution(agencyId: number) : Promise<BookingStatusDistributionResponse> {
  const response = await apiClient.get<BookingStatusDistributionResponse>(`/agencies/${agencyId}/overview/status-distribution`)
  return response.data
}

export async function getReservationByRoomType(agencyId: number) : Promise<RoomTypeStatsResponse> {
  const response = await apiClient.get<RoomTypeStatsResponse>(`/agencies/${agencyId}/overview/reservations-by-room-type`)
  return response.data
}
