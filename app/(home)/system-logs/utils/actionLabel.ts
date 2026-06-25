import type { TFunction } from 'i18next'
import { ACTION_LABEL_FALLBACK } from '../constants/systemLogsConstants'

export function getActionLabelKey(action: string): string {
  return action
    .toLowerCase()
    .split('_')
    .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

export function getActionLabel(action: string, t: TFunction): string {
  const fallback = ACTION_LABEL_FALLBACK[action] ?? action.replace(/_/g, ' ')
  return t(`systemLogs.actions.${getActionLabelKey(action)}`, fallback)
}
