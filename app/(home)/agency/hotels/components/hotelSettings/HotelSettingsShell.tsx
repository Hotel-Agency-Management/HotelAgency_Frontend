"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Building2, FileText, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  getHotelSettingsRoute,
  getHotelTermsRoute,
} from "../../terms-and-conditions/utils/routes";

interface HotelSettingsShellProps {
  hotelId: string;
  agencyId?: string;
  children: React.ReactNode;
}

export function HotelSettingsShell({
  hotelId,
  agencyId,
  children,
}: HotelSettingsShellProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const generalPath = getHotelSettingsRoute(hotelId, agencyId);
  const termsPath = getHotelTermsRoute(hotelId, agencyId);
  const activeGeneralTab =
    searchParams.get("tab") === "theme" ? "theme" : "profile";

  const currentTab =
    pathname === termsPath ? "terms" : activeGeneralTab;

  return (
    <Stack spacing={3}>
      <Tabs
        value={currentTab}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          value="profile"
          label={t("hotelSettings.tabs.hotelProfile", "Hotel Profile")}
          icon={<Building2 size={18} />}
          iconPosition="start"
          component={Link}
          href={generalPath}
        />
        <Tab
          value="theme"
          label={t("hotelSettings.tabs.customTheme", "Custom Theme")}
          icon={<Palette size={18} />}
          iconPosition="start"
          component={Link}
          href={`${generalPath}?tab=theme`}
        />
        <Tab
          value="terms"
          label={t("hotelSettings.tabs.termsAndConditions", "Terms & Conditions")}
          icon={<FileText size={18} />}
          iconPosition="start"
          component={Link}
          href={termsPath}
        />
      </Tabs>

      {children}
    </Stack>
  );
}
