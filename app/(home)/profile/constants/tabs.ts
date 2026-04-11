import { Actions, Subjects } from "@/lib/abilities"
import { AgencyTab } from "../components/AgencyTab"
import ChangePassword from "../components/ChangePassword"
import { HotelTab } from "../components/HotelTab"
import { OverviewTab } from "../components/OverviewTab"
import { ProfilePageData } from "../types/profile"

type TabItem = {
  label: string
  component: React.ComponentType<any>
  dataKey?: keyof ProfilePageData
  subject?: Subjects
  action?: Actions
  passthrough?: boolean
}

export const TAB_LIST: TabItem[] = [
  {
    label: 'Overview',
    component: OverviewTab,
    dataKey: 'overview',
    passthrough: true,
  },
  {
    label: 'Agency Information',
    component: AgencyTab,
    dataKey: 'agency',
    subject: 'Agency',
    action: 'read',
  },
  {
    label: 'Hotel Information',
    component: HotelTab,
    dataKey: 'hotel',
    subject: 'Hotels',
    action: 'read',
  },
  {
    label: 'Change Password',
    component: ChangePassword,
    passthrough: true,
  },
]
