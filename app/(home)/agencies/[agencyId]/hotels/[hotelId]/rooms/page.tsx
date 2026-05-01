"use client";

import { useParams } from "next/navigation";
import RoomsPage from "@/app/(home)/agency/hotels/[hotelId]/rooms/components/room/RoomsPage";

export default function AdminHotelRoomsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();

  return (
    <RoomsPage
      scope={{
        mode: "admin",
        agencyId: Number(agencyId),
        hotelId: Number(hotelId),
      }}
    />
  );
}
