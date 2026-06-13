import { systemLogsMock } from '../data/systemLogsMock'
import type { SystemLogsFilters } from '../types/systemLog'

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_FILTERS: SystemLogsFilters = {
  search: '',
  action: '',
  entityType: '',
  actorId: '',
  from: null,
  to: null
}

export const ACTION_OPTIONS = Array.from(new Set(systemLogsMock.map(log => log.action))).sort()

export const ENTITY_TYPE_OPTIONS = Array.from(new Set(systemLogsMock.map(log => log.entityType))).sort()
