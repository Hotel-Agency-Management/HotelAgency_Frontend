import type { TFunction } from 'i18next'
import type { BoardColumn } from '../types/board'

export function getBoardColumns(t: TFunction): BoardColumn[] {
  return [
    { id: 'Todo', label: t('housekeeping.tickets.columns.toDo', { defaultValue: 'To Do' }), colorKey: 'secondary' },
    { id: 'InProgress', label: t('housekeeping.tickets.columns.inProgress', { defaultValue: 'In Progress' }), colorKey: 'info' },
    { id: 'Review', label: t('housekeeping.tickets.columns.review', { defaultValue: 'Review' }), colorKey: 'warning' },
    { id: 'Done', label: t('housekeeping.tickets.columns.done', { defaultValue: 'Done' }), colorKey: 'success' }
  ]
}

/** @deprecated Use getBoardColumns(t) for translated column labels. */
export const BOARD_COLUMNS: BoardColumn[] = [
  { id: 'Todo', label: 'To Do', colorKey: 'secondary' },
  { id: 'InProgress', label: 'In Progress', colorKey: 'info' },
  { id: 'Review', label: 'Review', colorKey: 'warning' },
  { id: 'Done', label: 'Done', colorKey: 'success' }
]

export const DROP_ANIMATION = {
  duration: 180,
  easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
}
