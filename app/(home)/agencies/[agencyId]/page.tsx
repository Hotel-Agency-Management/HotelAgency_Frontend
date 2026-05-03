'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { Building2, Palette } from 'lucide-react'
import { AdminAgencyProfileSection } from '../components/AdminAgencyProfileSection'
import { CustomThemeTab } from '@/app/(home)/agency/components/theme/CustomThemeTab'
import { useAdminCustomThemeSection } from '../hooks/useAdminCustomThemeSection'
import { BorderedTabs, TabPanelContent } from '../styles/StyledComponents'
import { Stack } from '@mui/material'

function TabPanel({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) {
  return (
    <Stack hidden={value !== index} role='tabpanel'>
      {value === index && <TabPanelContent>{children}</TabPanelContent>}
    </Stack>
  )
}

export default function AdminAgencySettingsPage() {
  const params = useParams()
  const agencyId = Number(params.agencyId)
  const [tab, setTab] = useState(0)

  const { brandingValues, handleThemeSave, handleLogoUpload, isSaving, isLogoUploading } =
    useAdminCustomThemeSection(agencyId)

  return (
    <Box>
      <BorderedTabs
        value={tab}
        onChange={(_, newVal) => setTab(newVal)}
      >
        <Tab label="Agency Profile" icon={<Building2 size={18} />} iconPosition="start" />
        <Tab label="Custom Theme" icon={<Palette size={18} />} iconPosition="start" />
      </BorderedTabs>

      <TabPanel value={tab} index={0}>
        <AdminAgencyProfileSection agencyId={agencyId} />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CustomThemeTab
          initialValues={brandingValues}
          onSave={handleThemeSave}
          isSaving={isSaving}
          displayLogo={brandingValues.logo}
          onLogoUpload={handleLogoUpload}
          isLogoUploading={isLogoUploading}
        />
      </TabPanel>
    </Box>
  )
}
