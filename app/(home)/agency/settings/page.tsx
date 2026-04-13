'use client'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Building2, Palette } from 'lucide-react'
import { AgencyProfileSection } from '../components/agencyProfile/AgencyProfileSection'
import { CustomThemeSection } from '../components/agencyProfile/CustomThemeSection'
import { TabPanel } from '../components/agencyProfile/TabPanel'
export default function AgencyPage() {
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, newVal) => setTab(newVal)}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Agency Profile" icon={<Building2 size={18} />} iconPosition="start" />
        <Tab label="Custom Theme" icon={<Palette size={18} />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <AgencyProfileSection />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CustomThemeSection />
      </TabPanel>
    </Box>
  )
}
