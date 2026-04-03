"use client";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { BedDouble, DoorOpen } from "lucide-react";
import { RoomTypesView } from "./components/roomType/RoomTypesView";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AgencyPage() {
  const [tab, setTab] = useState(0);
  const { hotelId } = useParams<{ hotelId: string }>()

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, newVal) => setTab(newVal)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab icon={<BedDouble size={16} />} iconPosition="start" label="Room Types" />
        <Tab icon={<DoorOpen size={16} />} iconPosition="start" label="Rooms" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <RoomTypesView hotelId={hotelId} />
      </TabPanel>

      <TabPanel value={tab} index={1}>
      </TabPanel>
    </Box>
  );
}
