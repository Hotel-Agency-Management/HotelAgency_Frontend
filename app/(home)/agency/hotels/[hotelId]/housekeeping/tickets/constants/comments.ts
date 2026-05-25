import type { TFunction } from 'i18next'

export const TICKET_COMMENT_ACTION_TYPE = {
  FEEDBACK: 'FEEDBACK',
  RESOLVED: 'RESOLVED',
  DAMAGE_REPORTED: 'DAMAGE_REPORTED'
} as const

export function getCommentActionTypeConfig(
  t: TFunction
): Record<string, { label: string; paletteKey: 'info' | 'success' | 'error'; icon: string }> {
  return {
    [TICKET_COMMENT_ACTION_TYPE.FEEDBACK]: {
      label: t('housekeeping.tickets.comments.actionTypes.Feedback', { defaultValue: 'Feedback' }),
      paletteKey: 'info',
      icon: 'MessageSquare'
    },
    [TICKET_COMMENT_ACTION_TYPE.RESOLVED]: {
      label: t('housekeeping.tickets.comments.actionTypes.Resolved', { defaultValue: 'Resolved' }),
      paletteKey: 'success',
      icon: 'CheckCircle2'
    },
    [TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED]: {
      label: t('housekeeping.tickets.comments.actionTypes.DamageReported', { defaultValue: 'Damage Reported' }),
      paletteKey: 'error',
      icon: 'AlertTriangle'
    }
  }
}

/** @deprecated Use getCommentActionTypeConfig(t) for translated labels. */
export const COMMENT_ACTION_TYPE_CONFIG: Record<
  string,
  { label: string; paletteKey: 'info' | 'success' | 'error'; icon: string }
> = {
  [TICKET_COMMENT_ACTION_TYPE.FEEDBACK]: {
    label: 'Feedback',
    paletteKey: 'info',
    icon: 'MessageSquare'
  },
  [TICKET_COMMENT_ACTION_TYPE.RESOLVED]: {
    label: 'Resolved',
    paletteKey: 'success',
    icon: 'CheckCircle2'
  },
  [TICKET_COMMENT_ACTION_TYPE.DAMAGE_REPORTED]: {
    label: 'Damage Reported',
    paletteKey: 'error',
    icon: 'AlertTriangle'
  }
}

export function getCommentQuickActions(t: TFunction) {
  return [
    { label: t('housekeeping.tickets.comments.quickActions.looksGood', { defaultValue: 'Looks good!' }), text: 'Looks good! ✅' },
    { label: t('housekeeping.tickets.comments.quickActions.needHelp', { defaultValue: 'Need help?' }), text: 'Need help? 👋' },
    {
      label: t('housekeeping.tickets.comments.quickActions.isBlocked', { defaultValue: 'This is blocked...' }),
      text: 'This is blocked 🛑'
    }
  ]
}

/** @deprecated Use getCommentQuickActions(t) for translated labels. */
export const COMMENT_QUICK_ACTIONS = [
  { label: 'Looks good!', text: 'Looks good! ✅' },
  { label: 'Need help?', text: 'Need help? 👋' },
  { label: 'This is blocked...', text: 'This is blocked 🛑' }
] as const
