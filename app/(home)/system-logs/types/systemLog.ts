export interface SystemLogItem {
  id: number
  actorId: number
  actorName: string
  actorRole: string
  action: string
  entityType: string
  entityId: number
  description: string
  agencyId: number | null
  hotelId: number | null
  createdAt: string
}

export interface SystemLogsFilters {
  search: string
  action: string
  entityType: string
  actorId: string
  from: Date | null
  to: Date | null
}

export interface SystemLogsResponse {
  items: SystemLogItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface SystemLogsParams {
  pageNumber?: number
  pageSize?: number
  action?: string
  entityType?: string
  actorId?: number
  from?: string
  to?: string
  search?: string
}
