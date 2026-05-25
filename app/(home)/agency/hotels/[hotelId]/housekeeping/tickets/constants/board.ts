import type { TFunction } from 'i18next'
import type { BoardColumn } from '../types/board'

export function getBoardColumns(t: TFunction): BoardColumn[] {
  return [
    { id: 'TO_DO', label: t('housekeeping.tickets.columns.toDo', { defaultValue: 'To Do' }), colorKey: 'secondary' },
    { id: 'IN_PROGRESS', label: t('housekeeping.tickets.columns.inProgress', { defaultValue: 'In Progress' }), colorKey: 'info' },
    { id: 'REVIEW', label: t('housekeeping.tickets.columns.review', { defaultValue: 'Review' }), colorKey: 'warning' },
    { id: 'DONE', label: t('housekeeping.tickets.columns.done', { defaultValue: 'Done' }), colorKey: 'success' }
  ]
}

/** @deprecated Use getBoardColumns(t) for translated column labels. */
export const BOARD_COLUMNS: BoardColumn[] = [
  { id: 'TO_DO', label: 'To Do', colorKey: 'secondary' },
  { id: 'IN_PROGRESS', label: 'In Progress', colorKey: 'info' },
  { id: 'REVIEW', label: 'Review', colorKey: 'warning' },
  { id: 'DONE', label: 'Done', colorKey: 'success' }
]

export const DROP_ANIMATION = {
  duration: 180,
  easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)'
}
