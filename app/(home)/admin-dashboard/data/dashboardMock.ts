import type { PieDataPoint } from '@/components/charts/types'
import { StatCardProps, LatestAgency, ActivityItem } from '../types/dashboardTypes'
import { AGENCY_STATUS } from '@/components/auth/types/authType'

export const STAT_CARDS: StatCardProps[] = [
  {
    title: 'Total Agencies',
    value: '1,284',
    subtitle: 'Registered on platform',
    trend: { value: '+14 this month', direction: 'up' },
    color: 'primary'
  },
  {
    title: 'Pending Approvals',
    value: '37',
    subtitle: 'Awaiting review',
    trend: { value: '+5 since yesterday', direction: 'up' },
    color: 'warning'
  },
  {
    title: 'Active Subscriptions',
    value: '946',
    subtitle: 'Currently active plans',
    trend: { value: '+2.3% vs last month', direction: 'up' },
    color: 'success'
  },
  {
    title: 'Total Revenue',
    value: '$128,450',
    subtitle: 'All time',
    trend: { value: '+$9,200 this month', direction: 'up' },
    color: 'info'
  }
]

// Revenue Overview
export const REVENUE_CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const REVENUE_CHART_DATA = [7200, 8400, 6900, 9800, 11200, 10400, 12800, 13500, 11900, 14200, 13100, 15600]

// Subscription Distribution
export const SUBSCRIPTION_CHART_DATA: PieDataPoint[] = [
  { label: 'Basic', value: 340 },
  { label: 'Pro', value: 420 },
  { label: 'Enterprise', value: 186 }
]

// Agencies Growth
export const AGENCIES_GROWTH_CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const AGENCIES_GROWTH_CHART_DATA = [38, 52, 45, 61, 74, 68, 88, 92, 79, 105, 98, 112]

// Approval Status
export const APPROVAL_CHART_DATA: PieDataPoint[] = [
  { label: 'Approved', value: 847 },
  { label: 'Pending', value: 37 },
  { label: 'Rejected', value: 58 }
]

export const LATEST_AGENCIES: LatestAgency[] = [
  { id: '1', name: 'Horizon Travel Co.', status: AGENCY_STATUS.APPROVED, plan: 'Enterprise', createdAt: '2025-07-01', country: 'UAE' },
  { id: '2', name: 'Wanderlust Agency', status: AGENCY_STATUS.PENDING, plan: 'Pro', createdAt: '2025-07-02', country: 'Egypt' },
  { id: '3', name: 'Sky Route Tours', status: AGENCY_STATUS.APPROVED, plan: 'Basic', createdAt: '2025-07-03', country: 'Jordan' },
  { id: '4', name: 'Alpine Escapes', status: AGENCY_STATUS.APPROVED, plan: 'Pro', createdAt: '2025-07-04', country: 'Saudi Arabia' },
  { id: '5', name: 'Nomad Collective', status: AGENCY_STATUS.PENDING, plan: 'Enterprise', createdAt: '2025-07-05', country: 'Qatar' },
  { id: '6', name: 'BlueSea Holidays', status: AGENCY_STATUS.REJECTED, plan: 'Basic', createdAt: '2025-07-06', country: 'Kuwait' },
  { id: '7', name: 'Meridian Journeys', status: AGENCY_STATUS.APPROVED, plan: 'Pro', createdAt: '2025-07-07', country: 'Bahrain' }
]

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
