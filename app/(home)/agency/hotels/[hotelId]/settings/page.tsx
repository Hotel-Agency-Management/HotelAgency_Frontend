"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Building2, Palette } from "lucide-react";
import { CustomThemeTab } from "@/app/(home)/agency/components/theme/CustomThemeTab";
import { HotelProfileTab } from "../../components/hotelProfile/HotelProfileTab";
import { useHotelStore } from "../../hooks/useHotelStore";
import { useAuth } from "@/core/context/AuthContext";
import type { HotelFormValues } from "../../types/hotel";
import type { BrandingSettings } from "@/core/theme/palette/branding";

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

export default function HotelSettingsPage() {
  const [tab, setTab] = useState(0);
  const { hotelId } = useParams<{ hotelId: string }>();
  const { user } = useAuth();
  const numericHotelId = Number(hotelId);
  const { hotel, updateHotel, isLoading } = useHotelStore(
    user?.agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );

  if (!hotel) {
    return <Alert severity="error">Hotel not found.</Alert>;
  }

  const handleSave = async (data: HotelFormValues) => {
    await updateHotel(hotelId, data);
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    await updateHotel(hotelId, {
      ...hotel,
      branding,
    });
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, newVal) => setTab(newVal)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label="Hotel Profile"
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
        <HotelProfileTab
          defaultValues={hotel}
          onSave={handleSave}
          isLoading={isLoading}
          isActive={hotel.isActive}
        />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CustomThemeTab
          initialValues={hotel.branding}
          onSave={handleThemeSave}
        />
      </TabPanel>
    </Box>
  );
}
