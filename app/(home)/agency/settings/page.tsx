"use client";
import { useMemo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Building2, Palette } from "lucide-react";
import { useSettings } from "@/core/hooks/useSettings";
import { BrandingSettings, sanitizeBrandingSettings, resolveBrandingColors } from "@/core/theme/palette/branding";
import { AgencyProfileTab } from "../components/agencyProfile/AgencyProfileTab";
import { CustomThemeTab } from "../components/theme/CustomThemeTab";
import { AgencyProfileResponse } from "../configs/agencyProfileConfig";
import { useUpdateAgencyProfile, useUpdateAgencyLogo } from "../hooks/mutations/useAgencyProfileMutation";
import { useGetAgencyProfile } from "../hooks/queries/useAgencyProfile";
import { AgencyProfile } from "../types/agencyProfile";

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

const EMPTY_PROFILE: AgencyProfile = {
  name: "",
  phone: "",
  country: "",
  city: "",
  files: [],
};

const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "");

function resolveAgencyLogoUrl(logoUrl?: string | null) {
  const value = logoUrl?.trim();

  if (!value) return null;

  if (/^(data:|blob:|https?:\/\/)/.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}${value}` : value;
  }

  return BACKEND_ORIGIN ? `${BACKEND_ORIGIN}/${value}` : value;
}

function mapAgencyProfile(profile?: AgencyProfileResponse): AgencyProfile {
  if (!profile) return EMPTY_PROFILE;

  return {
    name: profile.name ?? "",
    phone: profile.phone ?? "",
    country: profile.country ?? "",
    city: profile.city ?? "",
    files: [],
  };
}

function mapBrandingSettings(
  profile?: AgencyProfileResponse,
  fallback?: BrandingSettings
): BrandingSettings {
  return sanitizeBrandingSettings({
    logo: fallback?.logo ?? resolveAgencyLogoUrl(profile?.logoUrl),
    colors: resolveBrandingColors({
      primary: profile?.primaryColor ?? fallback?.colors.primary,
      secondary: profile?.secondaryColor ?? fallback?.colors.secondary,
      tertiary: profile?.tertiaryColor ?? fallback?.colors.tertiary,
    }),
  });
}

export default function AgencyPage() {
  const [tab, setTab] = useState(0);
  const { settings, saveSettings } = useSettings();
  const { data: agencyProfile, isLoading: isProfileLoading } =
    useGetAgencyProfile();
  const updateAgencyProfile = useUpdateAgencyProfile();
  const updateAgencyLogo = useUpdateAgencyLogo();

  const profileValues = useMemo(
    () => mapAgencyProfile(agencyProfile),
    [agencyProfile]
  );

  const brandingValues = useMemo(
    () => mapBrandingSettings(agencyProfile, settings.branding),
    [agencyProfile, settings.branding]
  );

  const handleSave = async (data: AgencyProfile) => {
    await updateAgencyProfile.mutateAsync({
      agencyName: data.name,
      phone: data.phone,
      country: data.country,
      city: data.city,
    });
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    const clean = sanitizeBrandingSettings(branding);

    await updateAgencyProfile.mutateAsync({
      primaryColor: clean.colors.primary,
      secondaryColor: clean.colors.secondary,
      tertiaryColor: clean.colors.tertiary,
    });

    saveSettings({ ...settings, branding: clean });
  };

  const handleLogoUpload = async (file: File, previewUrl: string) => {
    await updateAgencyLogo.mutateAsync(file);
    saveSettings({
      ...settings,
      branding: {
        ...settings.branding,
        logo: previewUrl,
      },
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
          defaultValues={profileValues}
          onSave={handleSave}
          isLoading={isProfileLoading}
        />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <CustomThemeTab
          initialValues={brandingValues}
          onSave={handleThemeSave}
          isSaving={updateAgencyProfile.isPending}
          displayLogo={brandingValues.logo}
          onLogoUpload={handleLogoUpload}
          isLogoUploading={updateAgencyLogo.isPending}
        />
      </TabPanel>
    </Box>
  );
}
