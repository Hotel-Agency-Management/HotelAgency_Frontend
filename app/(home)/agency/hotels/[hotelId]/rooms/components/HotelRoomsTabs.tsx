"use client";

import { useState } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useParams } from "next/navigation";
import { BedDouble, DoorOpen, Sparkles } from "lucide-react";
import { RoomAmenitiesPage } from "./amenity/RoomAmenitiesPage";
import { RoomTypesView } from "./roomType/RoomTypesView";
import RoomsPage from "./room/RoomsPage";
import { HotelRoomsTabPanel } from "./HotelRoomsTabPanel";

export function HotelRoomsTabs() {
  const [tab, setTab] = useState(0);
  const { hotelId } = useParams<{ hotelId: string }>();

  return (
    <Stack spacing={0}>
      <Tabs
        value={tab}
        onChange={(_, next) => setTab(next)}
        aria-label="Hotel rooms and types"
      >
        <Tab
          icon={<BedDouble size={16} />}
          iconPosition="start"
          label="Room Types"
          id="hotel-rooms-tab-0"
          aria-controls="hotel-rooms-tabpanel-0"
        />
        <Tab
          icon={<DoorOpen size={16} />}
          iconPosition="start"
          label="Rooms"
          id="hotel-rooms-tab-1"
          aria-controls="hotel-rooms-tabpanel-1"
        />
        <Tab
          icon={<Sparkles size={16} />}
          iconPosition="start"
          label="Amenities"
          id="hotel-rooms-tab-2"
          aria-controls="hotel-rooms-tabpanel-2"
        />
      </Tabs>
      <Divider />
      <HotelRoomsTabPanel value={tab} index={0}>
        <RoomTypesView hotelId={hotelId} />
      </HotelRoomsTabPanel>
      <HotelRoomsTabPanel value={tab} index={1}>
        <RoomsPage />
      </HotelRoomsTabPanel>
      <HotelRoomsTabPanel value={tab} index={2}>
        <RoomAmenitiesPage />
      </HotelRoomsTabPanel>
    </Stack>
  );
}
