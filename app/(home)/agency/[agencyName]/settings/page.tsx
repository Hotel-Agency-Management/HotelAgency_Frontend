"use client";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Building2, Palette } from "lucide-react";
import { AgencyProfileTab } from "../../components/agencyProfile/AgencyProfileTab";
import { CustomThemeTab } from "../../components/theme/CustomThemeTab";
import { MOCK_PROFILE } from "../../data/agency";
import { AgencyProfile } from "../../types/agencyProfile";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </Box>
  );
}

export default function AgencyPage() {
  const [tab, setTab] = useState(0);

  const handleSave = async (data: AgencyProfile) => {
    console.log("Saving agency profile:", data);
    await new Promise((res) => setTimeout(res, 1000));
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, newVal) => setTab(newVal)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Agency Profile"
          icon={<Building2 size={18} />}
          iconPosition="start"
        />
        <Tab
          label="Custom Theme"
          icon={<Palette size={18} />}
          iconPosition="start"
        />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <AgencyProfileTab
          defaultValues={MOCK_PROFILE}
          onSave={handleSave}
          isLoading={false}
        />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CustomThemeTab />
      </TabPanel>
    </Box>
  );
}
