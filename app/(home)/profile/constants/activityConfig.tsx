import { CheckSquare, Eye, MessageSquare, GitCommit } from 'lucide-react'
import { ActivityType } from '../types/profile'

export const activityConfig: Record<ActivityType, { icon: React.ReactNode; color: string }> = {
  task: { icon: <CheckSquare size={15} />, color: 'success.main' },
  review: { icon: <Eye size={15} />, color: 'info.main' },
  comment: { icon: <MessageSquare size={15} />, color: 'warning.main' },
  commit: { icon: <GitCommit size={15} />, color: 'primary.main' }
}
