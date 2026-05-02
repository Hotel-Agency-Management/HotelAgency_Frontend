"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import { BedDouble, Sparkles } from "lucide-react";
import { BorderedTabs } from "../../styles/StyledComponents";
import { getRouteParam } from "../../utils/routeParams";

interface HotelResourcesTabsProps {
  children: React.ReactNode;
}

export function HotelResourcesTabs({ children }: HotelResourcesTabsProps) {
  const params = useParams();
  const pathname = usePathname();
  const hotelId = getRouteParam(params.hotelId);
  const basePath = `/agency/hotels/${hotelId}`;
  const currentTab = pathname.endsWith("/facilities") ? "facilities" : "rooms";

  return (
    <Stack spacing={3}>
      <BorderedTabs value={currentTab}>
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
      </BorderedTabs>

      {children}
    </Stack>
  );
}
