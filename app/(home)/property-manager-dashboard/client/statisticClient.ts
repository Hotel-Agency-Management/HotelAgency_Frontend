import apiClient from "@/core/clients/apiClient";
import { InsuranceIncomeTrendItem, ReservationsSummary, ReservationStatusSummaryResponse, ReservationTypeSummaryResponse, RevenueTrendResponse, RoomStatusSummaryResponse, TicketCompletionRateResponse } from "../config/statisticConfig";

export async function getStatCard(hotelId: number) : Promise<ReservationsSummary> {
  const response = await apiClient.get<ReservationsSummary>(`/hotels/${hotelId}/overview/cards`)
  return response.data
}

export async function getRoomStatusDistribution(hotelId: number) : Promise<RoomStatusSummaryResponse> {
  const response = await apiClient.get<RoomStatusSummaryResponse>(`/hotels/${hotelId}/overview/room-status-distribution`)
  return response.data
}

export async function getReservationStatusDistribution(hotelId: number) : Promise<ReservationStatusSummaryResponse> {
  const response = await apiClient.get<ReservationStatusSummaryResponse>(`/hotels/${hotelId}/overview/reservation-status-distribution`)
  return response.data
}

export async function getReservationTypeDistribution(hotelId: number) : Promise<ReservationTypeSummaryResponse> {
  const response = await apiClient.get<ReservationTypeSummaryResponse>(`/hotels/${hotelId}/overview/booking-types-distribution`)
  return response.data
}

export async function getRevenueTrend(hotelId: number, groupBy: string) : Promise<RevenueTrendResponse> {
  const response = await apiClient.get<RevenueTrendResponse>(`/hotels/${hotelId}/overview/revenue-trend?groupBy=${groupBy}`)
  return response.data
}

export async function getInsuranceIncomeTrend(hotelId: number): Promise<InsuranceIncomeTrendItem[]> {
  const response = await apiClient.get<InsuranceIncomeTrendItem[]>(`/hotels/${hotelId}/overview/insurance-income-trend`)
  return response.data
}

export async function getTicketCompletionRate(hotelId: number): Promise<TicketCompletionRateResponse> {
  const response = await apiClient.get<TicketCompletionRateResponse>(`/hotels/${hotelId}/overview/ticket-completion-rate`)
  return response.data
}
