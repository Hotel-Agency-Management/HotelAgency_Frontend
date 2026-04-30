"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { BedDouble, Sparkles } from "lucide-react";

interface HotelResourcesTabsProps {
  children: React.ReactNode;
}

function getRouteParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function HotelResourcesTabs({ children }: HotelResourcesTabsProps) {
  const params = useParams();
  const pathname = usePathname();
  const hotelId = getRouteParam(params.hotelId);
  const basePath = `/agency/hotels/${hotelId}`;
  const currentTab = pathname.endsWith("/facilities") ? "facilities" : "rooms";

  return (
    <Stack spacing={3}>
      <Tabs
        value={currentTab}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          value="rooms"
          label="Rooms"
          icon={<BedDouble size={18} />}
          iconPosition="start"
          component={Link}
          href={`${basePath}/rooms`}
        />
        <Tab
          value="facilities"
          label="Facilities"
          icon={<Sparkles size={18} />}
          iconPosition="start"
          component={Link}
          href={`${basePath}/facilities`}
        />
      </Tabs>

      {children}
    </Stack>
  );
}
