"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Building2, FileText, Palette } from "lucide-react";
import {
  getHotelSettingsRoute,
  getHotelTermsRoute,
} from "../../terms-and-conditions/utils/routes";

interface HotelSettingsShellProps {
  hotelId: string;
  children: React.ReactNode;
}

export function HotelSettingsShell({
  hotelId,
  children,
}: HotelSettingsShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const generalPath = getHotelSettingsRoute(hotelId);
  const termsPath = getHotelTermsRoute(hotelId);
  const activeGeneralTab =
    searchParams.get("tab") === "theme" ? "theme" : "profile";

  const currentTab =
    pathname === termsPath ? "terms" : activeGeneralTab;

  return (
    <Box>
      <Tabs
        value={currentTab}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          value="profile"
          label="Hotel Profile"
          icon={<Building2 size={18} />}
          iconPosition="start"
          component={Link}
          href={generalPath}
        />
        <Tab
          value="theme"
          label="Custom Theme"
          icon={<Palette size={18} />}
          iconPosition="start"
          component={Link}
          href={`${generalPath}?tab=theme`}
        />
        <Tab
          value="terms"
          label="Terms & Conditions"
          icon={<FileText size={18} />}
          iconPosition="start"
          component={Link}
          href={termsPath}
        />
      </Tabs>

      <Box sx={{ pt: 3 }}>{children}</Box>
    </Box>
  );
}
