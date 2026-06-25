import apiClient from '@/core/clients/apiClient'
import type { SystemLogsParams, SystemLogsResponse } from '../types/systemLog'

export async function getAdminSystemLogs(
  params?: SystemLogsParams,
  signal?: AbortSignal
): Promise<SystemLogsResponse> {
  const response = await apiClient.get<SystemLogsResponse>('/admin/system-logs', { params, signal })
  return response.data
}

export async function getAgencySystemLogs(
  params?: SystemLogsParams,
  signal?: AbortSignal
): Promise<SystemLogsResponse> {
  const response = await apiClient.get<SystemLogsResponse>('/agencies/logs', { params, signal })
  return response.data
}

export async function getHotelSystemLogs(
  hotelId: number,
  params?: SystemLogsParams,
  signal?: AbortSignal
): Promise<SystemLogsResponse> {
  const response = await apiClient.get<SystemLogsResponse>(`/hotels/${hotelId}/logs`, { params, signal })
  return response.data
}
