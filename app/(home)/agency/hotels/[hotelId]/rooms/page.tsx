"use client";
import { useParams } from "next/navigation";
import RoomsPage from "./components/room/RoomsPage";

export default function HotelRoomsPage() {
  const { hotelId } = useParams<{ hotelId: string }>();

  return <RoomsPage scope={{ mode: "agency", hotelId: Number(hotelId) }} />;
}
