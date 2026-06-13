import { ActivityItem } from '../types/dashboardTypes'

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    type: 'approval_submitted',
    message: 'Nomad Collective submitted their profile for approval',
    actor: 'System',
    timestamp: '2025-07-07T09:15:00Z'
  },
  {
    id: 'a2',
    type: 'agency_approved',
    message: 'Horizon Travel Co. was approved by admin',
    actor: 'Admin Hassan',
    timestamp: '2025-07-07T08:40:00Z'
  },
  {
    id: 'a3',
    type: 'subscription_updated',
    message: 'Alpine Escapes upgraded from Basic to Pro',
    actor: 'System',
    timestamp: '2025-07-06T17:22:00Z'
  },
  {
    id: 'a4',
    type: 'plan_created',
    message: "New plan 'Enterprise Plus' was created",
    actor: 'Admin Sara',
    timestamp: '2025-07-06T14:05:00Z'
  }
]
