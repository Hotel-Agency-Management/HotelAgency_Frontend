"use client";

import { useParams } from "next/navigation";
import { RoomProfileView } from "@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomProfileView";

export default function AdminHotelRoomProfilePage() {
  const { agencyId, hotelId, roomId } = useParams<{
    agencyId: string;
    hotelId: string;
    roomId: string;
  }>();

  return (
    <RoomProfileView
      scope={{
        mode: "admin",
        agencyId: Number(agencyId),
        hotelId: Number(hotelId),
      }}
      roomId={Number(roomId)}
    />
  );
}
