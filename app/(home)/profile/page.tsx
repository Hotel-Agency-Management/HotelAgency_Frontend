'use client'

import { useState } from 'react'
import { Container, Tabs, Tab, Stack } from '@mui/material'
import { FadeIn } from '@/components/animation'
import { profileDummyData } from '@/lib/profileDummyData'
import { HeroCard } from './components/HeroCard'
import { TabPanel } from './components/TabPanel'
import { OverviewTab } from './components/OverviewTab'
import ChangePassword from './components/ChangePassword'

export default function ProfilePage() {
  const [tab, setTab] = useState(0)
  const data = profileDummyData

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Stack spacing={3}>
      <HeroCard data={data} />
      <FadeIn direction='up' distance={12} transition={{ delay: 0.15, duration: 0.22 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label='Overview' />
          <Tab label='Change Password' />
        </Tabs>
      </FadeIn>
      </Stack>

      <TabPanel value={tab} index={0}>
        <OverviewTab data={data} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ChangePassword />
      </TabPanel>
    </Container>
  )
}
