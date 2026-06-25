import { useQuery } from '@tanstack/react-query'
import { getAdminSystemLogs, getAgencySystemLogs, getHotelSystemLogs } from '../../api/systemLogsClient'
import type { SystemLogsParams } from '../../types/systemLog'

export function useAdminSystemLogsQuery(params: SystemLogsParams, enabled: boolean) {
  return useQuery({
    queryKey: ['admin-system-logs', params],
    queryFn: ({ signal }) => getAdminSystemLogs(params, signal),
    enabled,
    placeholderData: prev => prev
  })
}

export function useAgencySystemLogsQuery(params: SystemLogsParams, enabled: boolean) {
  return useQuery({
    queryKey: ['agency-system-logs', params],
    queryFn: ({ signal }) => getAgencySystemLogs(params, signal),
    enabled,
    placeholderData: prev => prev
  })
}

export function useHotelSystemLogsQuery(hotelId: number | undefined, params: SystemLogsParams, enabled: boolean) {
  return useQuery({
    queryKey: ['hotel-system-logs', hotelId, params],
    queryFn: ({ signal }) => getHotelSystemLogs(hotelId as number, params, signal),
    enabled: enabled && Number.isFinite(hotelId),
    placeholderData: prev => prev
  })
}
