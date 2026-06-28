import type { TFunction } from 'i18next'
import { ENTITY_TYPE_LABEL_FALLBACK } from '../constants/systemLogsConstants'

export function getEntityTypeLabelKey(entityType: string): string {
  return entityType.charAt(0).toLowerCase() + entityType.slice(1)
}

export function getEntityTypeLabel(entityType: string, t: TFunction): string {
  const fallback = ENTITY_TYPE_LABEL_FALLBACK[entityType] ?? entityType
  return t(`systemLogs.entityTypes.${getEntityTypeLabelKey(entityType)}`, fallback)
}
