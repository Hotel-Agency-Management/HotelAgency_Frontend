"use client";

import { useParams } from "next/navigation";
import { RoomProfileView } from "../components/profile/RoomProfileView";

export default function HotelRoomProfilePage() {
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();

  return (
    <RoomProfileView
      scope={{ mode: "agency", hotelId: Number(hotelId) }}
      roomId={Number(roomId)}
    />
  );
}
