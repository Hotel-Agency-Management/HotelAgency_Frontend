'use client'

import { useMemo, useState } from 'react'
import { Container, Tabs, Tab, Stack } from '@mui/material'
import { FadeIn } from '@/components/animation'
import { useAuth } from '@/core/context/AuthContext'
import { useAbility } from '@/core/hooks/useAbility'
import { HeroCard } from './components/HeroCard'
import { TabPanel } from './components/TabPanel'
import { buildProfilePageData } from './util/buildProfilePageData'
import { TAB_LIST } from './constants/tabs'
import Can from '@/components/ability/Can'
import { useUserProfile } from './hooks/queries/useUserProfile'

export default function ProfilePage() {
  const [tab, setTab] = useState(0)
  const { user } = useAuth()
  const { data: profile } = useUserProfile()
  const ability = useAbility()
  const data = useMemo(
  () => buildProfilePageData(user, profile ?? null),
  [user, profile]
)

  const visibleTabs = useMemo(
    () => TAB_LIST.filter((t) =>
      t.passthrough
        ? true
        : ability.can(t.action!, t.subject!) && (t.dataKey ? !!data[t.dataKey] : true)
    ),
    [ability, data]
  )

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Stack spacing={3}>
        <HeroCard data={data.hero} />
        <FadeIn direction='up' distance={12} transition={{ delay: 0.15, duration: 0.22 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {visibleTabs.map((tabItem) => (
              <Tab key={tabItem.label} label={tabItem.label} />
            ))}
          </Tabs>
        </FadeIn>
      </Stack>

      {visibleTabs.map((tabItem, index) =>
        tabItem.passthrough ? (
          <TabPanel key={tabItem.label} value={tab} index={index}>
            <tabItem.component data={tabItem.dataKey ? data[tabItem.dataKey] : undefined} />
          </TabPanel>
        ) : (
          <Can key={tabItem.label} do={tabItem.action!} this={tabItem.subject!}>
            <TabPanel value={tab} index={index}>
              <tabItem.component data={tabItem.dataKey ? data[tabItem.dataKey] : undefined} />
            </TabPanel>
          </Can>
        )
      )}
    </Container>
  )
}
