'use client'

import { useEffect, useMemo, useState } from 'react'
import { Container, Tabs, Tab, Stack } from '@mui/material'
import { FadeIn } from '@/components/animation'
import { useAuth } from '@/core/context/AuthContext'
import { useAbility } from '@/core/hooks/useAbility'
import { HeroCard } from './components/HeroCard'
import { TabPanel } from './components/TabPanel'
import { OverviewTab } from './components/OverviewTab'
import { AgencyTab } from './components/AgencyTab'
import { HotelTab } from './components/HotelTab'
import ChangePassword from './components/ChangePassword'
import { buildProfilePageData } from './util/buildProfilePageData'

export default function ProfilePage() {
  const [tab, setTab] = useState(0)
  const { user } = useAuth()
  console.log('user from auth:', user)
  const ability = useAbility()
  const data = useMemo(() => buildProfilePageData(user), [user])

  const tabs = useMemo(() => {
    const profileTabs = [
      {
        label: 'Overview',
        content: <OverviewTab data={data.overview} />,
      },
    ]

    if (ability.can('read', 'Agency') && data.agency) {
      profileTabs.push({
        label: 'Agency Information',
        content: <AgencyTab data={data.agency} />,
      })
    }

    if (ability.can('read', 'Hotels') && data.hotel) {
      profileTabs.push({
        label: 'Hotel Information',
        content: <HotelTab data={data.hotel} />,
      })
    }

    profileTabs.push({
      label: 'Change Password',
      content: <ChangePassword />,
    })

    return profileTabs
  }, [ability, data.agency, data.hotel, data.overview])

  useEffect(() => {
    if (tab >= tabs.length) {
      setTab(0)
    }
  }, [tab, tabs.length])

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Stack spacing={3}>
        <HeroCard data={data.hero} />
        <FadeIn direction='up' distance={12} transition={{ delay: 0.15, duration: 0.22 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {tabs.map((tabItem) => (
              <Tab key={tabItem.label} label={tabItem.label} />
            ))}
          </Tabs>
        </FadeIn>
      </Stack>

      {tabs.map((tabItem, index) => (
        <TabPanel key={tabItem.label} value={tab} index={index}>
          {tabItem.content}
        </TabPanel>
      ))}
    </Container>
  )
}
